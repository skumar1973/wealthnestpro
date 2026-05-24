import Footer from "../component/footer"
import MyNavbar from "../component/navbar"

const people = [
  {
    name: 'Mr. Naveen Kumar',
    role: 'Founder / CEO',
    phone: '+91 9818933958',
    email: 'info@wealthnestpro.com',
    address: 'Unit 418, Emerald Plaza, Sector-65, Gurugram, Haryana - 122018 (INDIA)',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  
]

export default function Contact() {
  return (
    <div className="bg-gray-800 min-h-screen flex flex-col justify-between">  
      <MyNavbar />
    <div className="bg-gray-800 py-24 sm:py-32">
     
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-pretty text-white sm:text-4xl">
            Meet our leadership
          </h2>
          <p className="mt-6 text-lg/8 text-gray-400">
            We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
            best results for our clients.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img
                  alt=""
                  src={person.imageUrl}
                  className="size-16 rounded-full outline-1 -outline-offset-1 outline-white/10"
                />
                <div>
                  <h3 className="text-base/7 font-semibold tracking-tight text-white">{person.name}</h3>
                  <p className="text-sm/6 font-semibold text-indigo-400">{person.role}</p>
                  <p className="text-sm/6 font-semibold text-red-400">{person.phone}</p>
                  <p className="text-sm/6 font-semibold text-indigo-400">{person.email}</p>
                  <p className="text-sm/6 font-semibold text-gray-400">{person.address}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
    <Footer />
    </div>
  )
}