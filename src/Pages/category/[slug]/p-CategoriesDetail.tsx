import Layout from "../../../components/layout-masterpage"

export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
  // Giả lập dữ liệu thể loại dựa trên slug
  const getCategoryData = (slug: string) => {
    const categories = {
      "van-hoc": { name: "Văn học", description: "Sách văn học Việt Nam và thế giới" },
      "kinh-doanh": { name: "Kinh doanh", description: "Sách về kinh doanh, quản lý và khởi nghiệp" },
      "tam-ly-hoc": { name: "Tâm lý học", description: "Sách về tâm lý học và phát triển bản thân" },
      "khoa-hoc": { name: "Khoa học", description: "Sách về khoa học tự nhiên và công nghệ" },
      "tieu-su": { name: "Tiểu sử", description: "Tiểu sử và hồi ký của những nhân vật nổi tiếng" },
      "lich-su": { name: "Lịch sử", description: "Sách về lịch sử Việt Nam và thế giới" },
      "tu-phat-trien": { name: "Tự phát triển", description: "Sách về phát triển bản thân và kỹ năng sống" },
      "thieu-nhi": { name: "Thiếu nhi", description: "Sách dành cho trẻ em và thiếu niên" },
      "tieu-thuyet": { name: "Tiểu thuyết", description: "Tiểu thuyết đa dạng các thể loại" },
      "ky-nang-song": { name: "Kỹ năng sống", description: "Sách về các kỹ năng sống và phát triển cá nhân" },
      "trinh-tham": { name: "Trinh thám", description: "Tiểu thuyết trinh thám và phá án" },
      "vien-tuong": { name: "Viễn tưởng", description: "Tiểu thuyết khoa học viễn tưởng và giả tưởng" },
    }

    return (
      categories[slug as keyof typeof categories] || {
        name: "Thể loại không xác định",
        description: "Không tìm thấy thông tin về thể loại này",
      }
    )
  }

  const category = getCategoryData(params.slug)

  // Giả lập danh sách sách theo thể loại
  const books = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Sách ${category.name} ${i + 1}`,
    author: `Tác giả ${i + 1}`,
    rating: 4.5,
    reviewCount: Math.floor(Math.random() * 200) + 50,
    coverUrl: `/placeholder.svg?height=450&width=300&text=Book%20${i + 1}`,
    slug: `sach-${category.name.toLowerCase().replace(/\s+/g, "-")}-${i + 1}`,
  }))

  return (
    <Layout>
      <section className="w-full py-12 md:py-24 bg-amber-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Thể loại: {category.name}</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Sách {category.name}</h2>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm">
                Sắp xếp theo:
              </label>
              <select id="sort" className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                <option value="popular">Phổ biến nhất</option>
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="rating">Đánh giá</option>
              </select>
            </div>
          </div>

          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-lg"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={book.coverUrl || "/placeholder.svg"}
                    width="300"
                    height="450"
                    alt={`Bìa sách ${book.title}`}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{book.title}</h3>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill={star <= Math.floor(book.rating) ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-amber-500"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">({book.reviewCount} đánh giá)</span>
                  </div>
                  <a
                    href={`/sach/${book.slug}`}
                    className="mt-3 w-full text-sm font-medium text-amber-600 hover:text-amber-700 hover:bg-amber-50 inline-flex items-center justify-center rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3"
                  >
                    Xem chi tiết
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
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
                3
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
          </div>
        </div>
      </section>
    </Layout>
  )
}
