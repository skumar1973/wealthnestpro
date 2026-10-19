"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { AlertCircle, ArrowRight, MessageSquareQuote, Star } from "lucide-react";

import { db } from "@/lib/firebase";

type Review = {
  id: string;
  customerName: string;
  rating: number;
  service: string;
  feedback: string;
  createdAt?: Timestamp | null;
};

const serviceLabels: Record<string, string> = {
  "home-loan": "Home Loan",
  "balance-transfer": "Balance Transfer",
  "loan-against-property": "Loan Against Property",
  other: "Other",
};

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadReviews() {
      try {
        setLoading(true);
        setError(false);

        const reviewsQuery = query(
          collection(db, "reviews"),
          where("status", "==", "approved"),
          orderBy("createdAt", "desc"),
          limit(3)
        );

        const snapshot = await getDocs(reviewsQuery);

        const approvedReviews: Review[] = snapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            customerName:
              typeof data.customerName === "string"
                ? data.customerName
                : "Customer",
            rating:
              typeof data.rating === "number"
                ? Math.min(5, Math.max(0, data.rating))
                : 0,
            service:
              typeof data.service === "string" ? data.service : "other",
            feedback:
              typeof data.feedback === "string" ? data.feedback : "",
            createdAt: data.createdAt instanceof Timestamp
              ? data.createdAt
              : null,
          };
        });

        if (!cancelled) {
          setReviews(approvedReviews);
        }
      } catch (err) {
        console.error("Unable to load customer reviews:", err);

        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadReviews();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      aria-labelledby="reviews-heading"
      className="bg-slate-50 py-16 dark:bg-slate-950 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-700 dark:text-amber-300">
            <MessageSquareQuote className="h-4 w-4" />
            Customer Feedback
          </div>

          <h2
            id="reviews-heading"
            className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
          >
            What Our Customers Say
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
            Read feedback from customers about their experience exploring
            home loans and property finance solutions with WealthNestPro.
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div
            role="status"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-4 h-5 w-28 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="mb-3 h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
                <div className="mb-8 h-4 w-4/5 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            ))}
            <span className="sr-only">Loading customer reviews</span>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div
            role="status"
            className="mx-auto flex max-w-xl items-center justify-center gap-3 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
          >
            <AlertCircle className="h-5 w-5 shrink-0" />
            Customer reviews could not be loaded right now. Please try again
            later.
          </div>
        )}

        {/* No approved reviews yet */}
        {!loading && !error && reviews.length === 0 && (
          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center dark:border-slate-800 dark:bg-slate-900">
            <MessageSquareQuote className="mx-auto mb-4 h-10 w-10 text-amber-500" />

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Your feedback matters
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Be among the first to share your experience with WealthNestPro.
            </p>

            <Link
              href="/reviews"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
            >
              Share Your Feedback
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Approved reviews */}
        {!loading && !error && reviews.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div
                  className="mb-4 flex items-center gap-1"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      aria-hidden="true"
                      className={`h-5 w-5 ${
                        index < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300 dark:text-slate-600"
                      }`}
                    />
                  ))}
                </div>

                <blockquote className="flex-1 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  &ldquo;{review.feedback}&rdquo;
                </blockquote>

                <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-800">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900 dark:text-white">
                        {review.customerName}
                      </p>

                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {serviceLabels[review.service] ?? "Other"}
                      </p>
                    </div>

                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-sm font-bold text-amber-700 dark:text-amber-300"
                      aria-hidden="true"
                    >
                      {review.customerName.trim().charAt(0).toUpperCase() || "C"}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Action links */}
        {!loading && !error && reviews.length > 0 && (
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/reviews"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 sm:w-auto"
            >
              Read All Reviews
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/reviews"
              className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 sm:w-auto"
            >
              Write a Review
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
