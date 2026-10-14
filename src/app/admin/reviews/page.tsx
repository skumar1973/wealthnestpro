
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type Review = {
  id: string;
  customerName: string;
  rating: number;
  service: string;
  feedback: string;
  status: "pending" | "approved" | "rejected";
  createdAt?: Timestamp;
};

export default function AdminReviewsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");
  const [authorized, setAuthorized] = useState(false);

  const loadReviews = useCallback(async () => {
    const snapshot = await getDocs(
      query(
        collection(db, "reviews"),
        orderBy("createdAt", "desc")
      )
    );

    setReviews(
      snapshot.docs.map((item) => ({
        id: item.id,
        ...(item.data() as Omit<Review, "id">),
      }))
    );
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setError("");

      if (!currentUser) {
        setUser(null);
        setAuthorized(false);
        router.replace("/admin/login");
        setLoading(false);
        return;
      }

      try {
        const moderatorSnap = await getDoc(
          doc(db, "moderators", currentUser.uid)
        );

        if (
          !moderatorSnap.exists() ||
          moderatorSnap.data().active !== true
        ) {
          await signOut(auth);
          router.replace("/admin/login");
          return;
        }

        setUser(currentUser);
        setAuthorized(true);
        await loadReviews();
      } catch {
        setError(
          "Unable to verify moderator access or load reviews. Check your Firestore rules and connection."
        );
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, loadReviews]);

  async function moderate(
    review: Review,
    status: "approved" | "rejected"
  ) {
    if (!user || busyId) return;

    const action = status === "approved" ? "approve" : "reject";

    if (!window.confirm(`Are you sure you want to ${action} this review?`)) {
      return;
    }

    setBusyId(review.id);
    setError("");

    try {
      await updateDoc(doc(db, "reviews", review.id), {
        status,
        moderatedAt: serverTimestamp(),
        moderatedBy: user.uid,
      });

      await loadReviews();
    } catch {
      setError(
        "The review could not be updated. Verify your moderator permission and Firestore rules."
      );
    } finally {
      setBusyId("");
    }
  }

  async function handleLogout() {
    await signOut(auth);
    router.replace("/admin/login");
  }

  const visibleReviews = reviews.filter((review) =>
    filter === "all" ? true : review.status === filter
  );

  if (loading) {
    return <main className="p-10">Loading moderation dashboard...</main>;
  }

  if (!authorized) {
    return (
      <main className="p-10">
        {error || "Checking moderator access..."}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Review Moderation
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Review customer feedback before publishing it.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg border px-4 py-2"
        >
          Sign out
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {["pending", "approved", "rejected", "all"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`rounded-full px-4 py-2 text-sm font-medium capitalize ${
              filter === status
                ? "bg-blue-700 text-white"
                : "border border-slate-300 dark:border-slate-700"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-red-700">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-4">
        {visibleReviews.map((review) => (
          <article
            key={review.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">
                  {review.customerName}
                </h2>
                <p className="mt-1 text-sm text-amber-600">
                  {"★".repeat(Math.max(0, Math.min(5, review.rating)))}
                  {"☆".repeat(5 - Math.max(0, Math.min(5, review.rating)))}
                  <span className="ml-2 text-slate-500">
                    ({review.rating}/5)
                  </span>
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm capitalize text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {review.status}
              </span>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Service: {review.service}
            </p>
            <p className="mt-3 whitespace-pre-wrap text-slate-700 dark:text-slate-200">
              {review.feedback}
            </p>
            <p className="mt-3 text-xs text-slate-500">
              Submitted:{" "}
              {review.createdAt?.toDate
                ? review.createdAt.toDate().toLocaleString()
                : "Date unavailable"}
            </p>

            {review.status === "pending" && (
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  disabled={busyId === review.id}
                  onClick={() => moderate(review, "approved")}
                  className="rounded-lg bg-emerald-700 px-4 py-2 font-medium text-white disabled:opacity-50"
                >
                  {busyId === review.id ? "Saving..." : "Approve"}
                </button>

                <button
                  disabled={busyId === review.id}
                  onClick={() => moderate(review, "rejected")}
                  className="rounded-lg bg-red-700 px-4 py-2 font-medium text-white disabled:opacity-50"
                >
                  {busyId === review.id ? "Saving..." : "Reject"}
                </button>
              </div>
            )}
          </article>
        ))}

        {visibleReviews.length === 0 && (
          <p className="rounded-xl border border-dashed p-8 text-center text-slate-500">
            No reviews found for this status.
          </p>
        )}
      </div>
    </main>
  );
}
