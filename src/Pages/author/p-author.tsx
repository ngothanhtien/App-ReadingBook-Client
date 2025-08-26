import Layout from "../../components/layout-masterpage";
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import MotionFadeIn from "../../components/animation_scroll";
const sortOptions_author = [
  { value: 'all', label: 'Tất cả' },
  { value: 'price-asc', label: 'Văn học' },
  { value: 'business', label: 'Kinh doanh' },
  { value: 'psychology', label: 'Tâm lý học' },
  { value: 'development_yourself', label: 'Phát triển bản thân' },
];

function SortDropdown() {
  const [selected, setSelected] = useState(sortOptions_author[0]);

  return (
    <div className="w-56">
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button
              className={`flex items-center justify-between rounded-md bg-white p-2 w-full text-left transition-all duration-300 ${
                open ? 'border border-transparent shadow-inner' : 'border border-gray-300'
              }`}
            >
              <span>{selected.label}</span>
              {open ? (
                <FaChevronUp size={15} color="black" />
              ) : (
                <FaChevronDown size={15} color="black" />
              )}
            </Listbox.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-700"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg z-10 border border-gray-200">
                {sortOptions_author.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option}
                    className={({ active }) =>
                      `cursor-pointer select-none p-2 ${
                        active ? 'bg-blue-100 text-blue-700' : ''
                      }`
                    }
                  >
                    {option.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
}
export default function AuthorsPage() {
  // Giả lập danh sách tác giả
  const authors = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Tác giả ${i + 1}`,
    bookCount: Math.floor(Math.random() * 20) + 1,
    avatarUrl: `https://file.hstatic.net/200000692705/file/paulo_coelho_6e47d5b36ffb47fbb9a2dce6f228f51a_grande.jpg`,
    category: i % 3 === 0 ? "Văn học" : i % 3 === 1 ? "Kinh doanh" : "Tâm lý học",
  }))

  return (
    <Layout>
      <section className="w-full md:h-[500px] md:py-0 bg-amber-50">
        <div className="px-0">
          <div className="w-full">
            <MotionFadeIn>
              <img 
              src="https://selfpublishing.com/wp-content/uploads/2020/03/How-to-Become-an-Author-8-Steps-to-Become-an-Author-of-a-Bestselling-Book.png"
              className="w-full h-auto shadow-lg"
              alt="Author illustration"
            />
            </MotionFadeIn>          
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <MotionFadeIn custom={1}>
              <h2 className="md:text-3xl font-bold text-stone-900">Danh sách tác giả ✍🏻</h2>
            </MotionFadeIn>

            <MotionFadeIn custom={2}>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-base md:text-lg">
                  Lọc theo:
                </label>
                <SortDropdown />
              </div>
            </MotionFadeIn>
          </div>
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {authors.map((author) => (
                <MotionFadeIn
                key={author.id}  
                custom={3}
                className="group relative overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg p-6 flex flex-col items-center text-center"
              >
                <div className="w-[200px] h-[200px] rounded-full overflow-hidden mb-4">
                  <img
                    src={author.avatarUrl || "/placeholder.svg"}
                    alt={`Ảnh ${author.name}`}
                    className="object-fix w-full h-full"
                  />
                </div>
                <h3 className="font-semibold text-2xl mb-6">{author.name}</h3>
                <p className="text-lg text-muted-foreground">{author.category}</p>
                <p className="text-sm text-muted-foreground mt-1">{author.bookCount} cuốn sách</p>
                <button className="mt-4 text-base bg-amber-50 font-medium text-amber-600 hover:text-amber-900 hover:bg-amber-300 inline-flex items-center justify-center rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 p-5">
                  Xem tác giả
                </button>
              </MotionFadeIn>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <MotionFadeIn>
              <nav className="flex items-center gap-1">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0">
                <span className="sr-only">Trang trước</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0 bg-amber-600 text-white hover:bg-amber-700">
                1
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0">
                2
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0">
                <span className="sr-only">Trang sau</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </nav>
            </MotionFadeIn>    
          </div>
        </div>
      </section>
    </Layout>
  )
}
