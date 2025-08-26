import Layout from "../../components/layout-masterpage"
import MotionFadeIn from "../../components/animation_scroll"
import Link from "next/link";

export default function CategoriesPage() {
  return (
    <Layout>
      <section className="w-full py-12 md:py-24 bg-amber-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col mb-12 items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <MotionFadeIn custom={1}>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Thể loại sách</h1>
              </MotionFadeIn>
              <MotionFadeIn custom={2}>
                <p className="max-w-[900px] text-stone-500 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Khám phá sách theo sở thích của bạn
                </p>
              </MotionFadeIn>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
            {[
              { name: "Văn học", icon: "book-text", slug: "van-hoc", count: 120, cat: "Literature" },
              { name: "Kinh doanh", icon: "book-marked", slug: "kinh-doanh", count: 85, cat: "Business" },
              { name: "Tâm lý học", icon: "book-open", slug: "tam-ly-hoc", count: 64, cat: "Psychology" },
              { name: "Khoa học", icon: "book-text", slug: "khoa-hoc", count: 72, cat: "Science" },
              { name: "Tiểu sử", icon: "users", slug: "tieu-su", count: 43, cat: "Biography" },
              { name: "Lịch sử", icon: "book-marked", slug: "lich-su", count: 56, cat: "History" },
              { name: "Tự phát triển", icon: "book-open", slug: "tu-phat-trien", count: 98, cat: "Self-help" },
              { name: "Thiếu nhi", icon: "book-text", slug: "thieu-nhi", count: 110, cat: "Children" },
              { name: "Tiểu thuyết", icon: "book-marked", slug: "tieu-thuyet", count: 145, cat: "Novel" },
              { name: "Kỹ năng sống", icon: "users", slug: "ky-nang-song", count: 78, cat: "Life Skills" },
              { name: "Trinh thám", icon: "book-text", slug: "trinh-tham", count: 67, cat: "Detective" },
              { name: "Viễn tưởng", icon: "book-open", slug: "vien-tuong", count: 89, cat: "Science Fiction" },
              { name: "Hài hước", icon: "book-text", slug: "hai-huoc", count: 45, cat: "Humor" },
              { name: "Thơ", icon: "book-marked", slug: "tho", count: 32, cat: "Poetry" },
              { name: "Truyện ngắn", icon: "book-open", slug: "truyen-ngan", count: 76, cat: "Short Stories" },
              { name: "Sách tham khảo", icon: "book-text", slug: "sach-tham-khao", count: 54, cat: "Reference" },
              { name: "Sách nấu ăn", icon: "book-marked", slug: "sach-nau-an", count: 41, cat: "Cookbook" },
              { name: "Du lịch", icon: "book-open", slug: "du-lich", count: 38, cat: "Travel" }
            ].map((category, index) => (
              <MotionFadeIn key={category.slug} custom={index}>
                <a
                  href={`/category/${category.slug}`}
                  className="flex flex-col shadow-xl items-center justify-center p-4 rounded-lg bg-white hover:bg-amber-100 transition-transform ease-in-out duration-500 hover:-translate-y-2 border"
                >
                  {category.icon === "book-open" && (
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
                      className="h-8 w-8 text-amber-600 mb-2"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  )}
                  {category.icon === "book-text" && (
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
                      className="h-8 w-8 text-amber-600 mb-2"
                    >
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                      <path d="M8 7h6"></path>
                      <path d="M8 11h8"></path>
                    </svg>
                  )}
                  {category.icon === "book-marked" && (
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
                      className="h-8 w-8 text-amber-600 mb-2"
                    >
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                      <polyline points="10 2 10 10 13 7 16 10 16 2"></polyline>
                    </svg>
                  )}
                  {category.icon === "users" && (
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
                      className="h-8 w-8 text-amber-600 mb-2"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  )}
                  <span className="text-sm font-medium text-center">{category.name}</span>
                  <span className="text-xs text-muted-foreground mt-1">({category.count} sách)</span>
                </a>   
              </MotionFadeIn>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
