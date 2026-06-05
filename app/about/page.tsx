
import Footer from "../components/footer"
import MyNavbar from "../components/navbar"

export default function About() {
  return (
    // <div className="bg-gray-800 min-h-screen flex flex-col justify-between">
    //   <MyNavbar />
    <section className="min-h-screen relative isolate overflow-hidden bg-gray-800 px-6 py-24 sm:py-32 lg:px-8">
      
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-500),transparent)] opacity-10" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900 shadow-xl ring-1 shadow-indigo-500/5 ring-white/5 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <img
          alt="wealthnestpro.in logo"
          src="/wealthnestpro_logo.png?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          className="mx-auto h-12"
        />
        <figure className="mt-10">
          <blockquote className="text-center text-xl/8 font-semibold text-white sm:text-2xl/9">
            <p>
              WealthNestPro is a leading financial technology company dedicated to providing innovative solutions for wealth management.
            </p>
          </blockquote>
          <figcaption className="mt-10">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="mx-auto size-10 rounded-full"
            />
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-white">Naveen Kumar</div>
              <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-white">
                <circle r={1} cx={1} cy={1} />
              </svg>
              <div className="text-gray-400">Founder & CEO of WealthNestPro.in</div>
            </div>
          </figcaption>
        </figure>
      </div>
      
    </section>
    // <Footer />
    // </div>
  )
}