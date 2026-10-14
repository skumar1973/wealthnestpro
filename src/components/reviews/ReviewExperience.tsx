"use client";

import { useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
  Timestamp,
} from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { AlertCircle, CheckCircle2, LoaderCircle, Star } from "lucide-react";
import { auth, db } from "@/lib/firebase";

type Service =
  | "home-loan"
  | "balance-transfer"
  | "loan-against-property"
  | "other";

type Review = {
  id: string;
  customerName: string;
  rating: number;
  service: Service;
  feedback: string;
  createdAt?: Timestamp;
};

const services: { value: Service; label: string }[] = [
  { value: "home-loan", label: "Home Loan" },
  { value: "balance-transfer", label: "Balance Transfer" },
  { value: "loan-against-property", label: "Loan Against Property" },
  { value: "other", label: "Other" },
];

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-teal-400";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? "fill-amber-400 text-amber-500"
              : "text-slate-300 dark:text-slate-700"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function serviceLabel(service: Service) {
  return services.find((item) => item.value === service)?.label ?? "Other";
}

export default function ReviewExperience() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [ratingFilter, setRatingFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [service, setService] = useState<Service>("home-loan");
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadReviews() {
      try {
        // Query only approved reviews. This matches the Firestore rules.
        const approvedQuery = query(
          collection(db, "reviews"),
          where("status", "==", "approved")
        );

        const snapshot = await getDocs(approvedQuery);

        const items: Review[] = snapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            customerName: data.customerName,
            rating: data.rating,
            service: data.service,
            feedback: data.feedback,
            createdAt: data.createdAt,
          };
        });

        items.sort(
          (a, b) =>
            (b.createdAt?.toMillis() ?? 0) -
            (a.createdAt?.toMillis() ?? 0)
        );

        if (active) setReviews(items);
      } catch (error) {
        console.error("Unable to load reviews:", error);

        if (active) {
          setLoadError(
            "Customer reviews are temporarily unavailable. Please try again later."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadReviews();

    return () => {
      active = false;
    };
  }, []);

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesRating =
        ratingFilter === "all" ||
        review.rating === Number(ratingFilter);

      const matchesService =
        serviceFilter === "all" || review.service === serviceFilter;

      return matchesRating && matchesService;
    });
  }, [reviews, ratingFilter, serviceFilter]);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length
      : 0;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFormMessage("");
    setFormError(false);

    try {
      // Reuse the existing Firebase app and authentication.
      const credential = auth.currentUser
        ? { user: auth.currentUser }
        : await signInAnonymously(auth);

      await addDoc(collection(db, "reviews"), {
        customerName: name.trim(),
        rating,
        service,
        feedback: feedback.trim(),
        status: "pending",
        createdAt: serverTimestamp(),
        userId: credential.user.uid,
      });

      setName("");
      setRating(5);
      setService("home-loan");
      setFeedback("");
      setFormMessage(
        "Thank you for your feedback! It has been submitted for review and will appear here after approval."
      );
    } catch (error) {
      console.error("Unable to submit review:", error);
      setFormError(true);
      setFormMessage(
        "We couldn't submit your feedback. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-12">
      {/* Rating summary */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="grid gap-8 sm:grid-cols-[200px_1fr] sm:items-center">
          <div className="text-center sm:border-r sm:border-slate-200 sm:pr-8 dark:sm:border-slate-800">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Average customer rating
            </p>

            <p className="mt-2 text-5xl font-bold tracking-tight text-slate-950 dark:text-white">
              {reviews.length ? averageRating.toFixed(1) : "—"}
            </p>

            <div className="mt-3 flex justify-center">
              <Stars rating={Math.round(averageRating)} />
            </div>

            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              {reviews.length} approved{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Customer experiences
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Explore published customer feedback about our loan guidance
              services. Ratings are calculated from the approved reviews
              currently available on this website.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section aria-labelledby="reviews-heading">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="reviews-heading"
              className="text-2xl font-bold text-slate-950 dark:text-white"
            >
              Customer reviews
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Filter feedback by rating or loan service.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="rating-filter"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Star rating
              </label>
              <select
                id="rating-filter"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className={inputClass}
              >
                <option value="all">All ratings</option>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="service-filter"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Loan service
              </label>
              <select
                id="service-filter"
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className={inputClass}
              >
                <option value="all">All services</option>
                {services.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading && (
          <div className="mt-8 flex items-center gap-3 text-slate-600 dark:text-slate-300">
            <LoaderCircle className="h-5 w-5 animate-spin" />
            Loading customer reviews...
          </div>
        )}

        {!loading && loadError && (
          <p role="alert" className="mt-6 text-sm text-rose-600 dark:text-rose-400">
            {loadError}
          </p>
        )}

        {!loading && !loadError && filteredReviews.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
            <Star className="mx-auto h-8 w-8 text-slate-400" />
            <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">
              No reviews found
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              There are no published reviews matching these filters yet.
            </p>
          </div>
        )}

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {filteredReviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-700"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {review.customerName}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {serviceLabel(review.service)}
                  </p>
                </div>

                <Stars rating={review.rating} />
              </div>

              <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600 dark:text-slate-300">
                {review.feedback}
              </p>

              {review.createdAt && (
                <p className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  {review.createdAt.toDate().toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Submit feedback */}
      <section
        id="write-review"
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-400">
            Share your experience
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">
            Leave a rating and feedback
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Share your experience with WealthNestPro. Your feedback will be
            reviewed before it is published.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-5">
          <div>
            <label htmlFor="review-name" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Your display name
            </label>
            <input
              id="review-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              minLength={2}
              maxLength={80}
              autoComplete="name"
              required
              placeholder="Enter your name"
              disabled={submitting}
            />
          </div>

          <div>
            <label htmlFor="review-rating" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Your rating
            </label>
            <select
              id="review-rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className={inputClass}
              disabled={submitting}
            >
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Very good</option>
              <option value={3}>3 - Good</option>
              <option value={2}>2 - Fair</option>
              <option value={1}>1 - Poor</option>
            </select>
          </div>

          <div>
            <label htmlFor="review-service" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Loan service
            </label>
            <select
              id="review-service"
              value={service}
              onChange={(e) => setService(e.target.value as Service)}
              className={inputClass}
              disabled={submitting}
            >
              {services.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="review-feedback" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Your feedback
            </label>
            <textarea
              id="review-feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className={`${inputClass} min-h-32 resize-y`}
              minLength={10}
              maxLength={1000}
              required
              rows={5}
              placeholder="Tell us about your experience..."
              disabled={submitting}
            />
            <p className="mt-1 text-right text-xs text-slate-500 dark:text-slate-400">
              {feedback.length}/1000 characters
            </p>
          </div>

          {formMessage && (
            <div
              role={formError ? "alert" : "status"}
              className={`flex gap-3 rounded-xl border p-4 text-sm leading-6 ${
                formError
                  ? "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-200"
                  : "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200"
              }`}
            >
              {formError ? (
                <AlertCircle className="h-5 w-5 shrink-0" />
              ) : (
                <CheckCircle2 className="h-5 w-5 shrink-0" />
              )}
              <p>{formMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-400"
          >
            {submitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
            {submitting ? "Submitting..." : "Submit feedback"}
          </button>

          <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
            Please do not include loan account numbers, PAN, bank details,
            OTPs, or other sensitive personal information.
          </p>
        </form>
      </section>
    </div>
  );
}
