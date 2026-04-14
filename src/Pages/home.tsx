import {useState, useEffect} from "react"
import { Link } from 'react-router-dom';
import Layout from "../components/layout-masterpage";
import MotionFadeIn from "../components/animation_scroll";
import allBooks from "../service/mockdatabook";

const ImageUrl = [
  "https://ischool.vn/wp-content/uploads/2022/12/nhung-cuon-sach-hay-cho-tre-10-tuoi-6.jpg",
  "https://ischool.vn/wp-content/uploads/2022/12/nhung-cuon-sach-hay-cho-tre-10-tuoi-4.jpg",
  "https://ischool.vn/wp-content/uploads/2022/12/nhung-cuon-sach-hay-cho-tre-10-tuoi-3.jpg",
  "https://ischool.vn/wp-content/uploads/2022/12/nhung-cuon-sach-hay-cho-tre-10-tuoi-2.jpg",
  "https://ischool.vn/wp-content/uploads/2022/12/nhung-cuon-sach-hay-cho-tre-10-tuoi-7.jpg",
  "https://ischool.vn/wp-content/uploads/2022/12/nhung-cuon-sach-hay-cho-tre-10-tuoi-9.jpg"
]
function ImageSlider(){
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);
    const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? ImageUrl.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === ImageUrl.length - 1 ? 0 : prev + 1
    );
  };
  return (
    <div className="relative w-full max-w-3xl mx-auto group py-10">
      {/* Ảnh slider */}
      <img
        src={ImageUrl[currentIndex]}
        alt="slide"
        className="w-full h-[650px] object-fix rounded-lg transition-all duration-700"
      />

      {/* Nút tua trái */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 scale-90 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 transition-all duration-1000 bg-white/70 text-black px-4 py-4 rounded-full hover:bg-white"
      >
        &#10094;
      </button>

      {/* Nút tua phải */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 scale-90 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 transition-all duration-1000 bg-white/70 text-black px-4 py-4 rounded-full hover:bg-white"
      >
        &#10095;
      </button>

      <div className="flex justify-center mt-2 gap-2">
        {ImageUrl.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentIndex ? "bg-amber-600" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}


export default function HomePage() {
  return (
    <Layout>
        <div className="flex min-h-screen flex-col">
        <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-24 lg:py-20 bg-amber-50">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <MotionFadeIn custom={1}>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Khám phá thế giới qua từng trang sách
                  </h1>
                </MotionFadeIn>
                <MotionFadeIn custom={2}>
                  <p className="max-w-[600px] text-stone-500 text-muted-foreground md:text-xl">
                    Tham gia cộng đồng đọc sách của chúng tôi để khám phá những cuốn sách hay, chia sẻ cảm nhận và kết nối
                    với những người yêu sách khác.
                  </p>
                </MotionFadeIn>
                <div className="flex flex-col gap-2 min-[400px]:flex-row ">
                  <MotionFadeIn custom={3}>
                    <button>
                      <a href="/payment" className="inline-flex text-white items-center justify-center rounded-md text-xl font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-amber-600 text-primary-foreground hover:bg-amber-700 h-11 p-7">
                        Bắt đầu đọc ngay
                      </a>
                    </button>
                  </MotionFadeIn>
                  <MotionFadeIn custom={4}>
                    <button className="inline-flex items-center justify-center rounded-md text-xl font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-input bg-background hover:bg-gray-200 hover:text-accent-foreground h-11 p-7">
                      Khám phá thêm
                    </button>
                  </MotionFadeIn>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <MotionFadeIn custom={5}>
                  <ImageSlider/>
                </MotionFadeIn> 
              </div>
            </div>
          </div>
        </section>

        {/* Featured Books */}
        <section className="w-full py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <MotionFadeIn custom={1}>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Sách nổi bật</h2>
                </MotionFadeIn>
                <MotionFadeIn custom={2}>
                  <p className="max-w-[900px] text-stone-500  text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Những cuốn sách được yêu thích nhất trong tháng này
                  </p>
                </MotionFadeIn>
              </div>
            </div>
            <MotionFadeIn custom={2}>
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 auto-rows-fr">
              {[allBooks[0],allBooks[1],allBooks[2],allBooks[3]].map((book,idx) => (
                  <div
                    key={idx}
                    className="group relative overflow-hidden rounded-lg border border-gray-300  bg-background transition-all hover:shadow-xl">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={`${book.coverUrl}`}
                        alt={`Book cover ${book}`}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <span className="inline-block px-2 py-1 text-sm font-medium bg-amber-100 text-amber-800 rounded-full mb-1">
                        {book.category}
                      </span>
                      <h3 title={book.title} className="font-semibold text-xl mb-3 line-clamp-1">{book.title}</h3>
                      <p title={book.author} className="text-base text-muted-foreground mb-3 line-clamp-1">Tác Giả: {book.author}</p>
                      <p title={book.description} className="text-base text-muted-foreground mb-3 line-clamp-1">{book.description}</p>
                      <div className="flex items-center mt-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-[16px] w-[16px] fill-amber-500 text-amber-500"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground ml-2">({book.reviewCount})</span>
                      </div>
                      <button className="mt-3 w-full text-base  font-medium text-amber-600 hover:text-amber-700 hover:bg-amber-100 inline-flex items-center justify-center ring-offset-background transition-transform duration-500 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3">
                        Xem chi tiết
                      </button>
                    </div>
                  </div>            
              ))}  
            </div>
            </MotionFadeIn>
            <MotionFadeIn custom={1}>
                <div className="flex justify-center mt-8">
                  <a href="/newbook">
                    <button className="inline-flex text-stone-500 items-center justify-center rounded-md text-[17px]  font-medium ring-offset-background transition-transform duration-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-white hover:bg-stone-300 hover:text-accent-foreground h-5 p-6 gap-1 hover:-translate-y-1">
                      Xem tất cả sách
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
                  </a>
              </div>
            </MotionFadeIn> 
          </div>
        </section>

        {/* Categories */}
        <MotionFadeIn custom={1}>
        <section className="w-full py-12 md:py-24 bg-amber-50">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Thể loại sách</h2>
                  <p className="max-w-[900px] text-stone-500 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Khám phá sách theo sở thích của bạn
                  </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
            {[
              { name: "Văn học", icon: "book-text", slug: "van-hoc" },
              { name: "Kinh doanh", icon: "book-marked", slug: "kinh-doanh" },
              { name: "Tâm lý học", icon: "book-open", slug: "tam-ly-hoc" },
              { name: "Khoa học", icon: "book-text", slug: "khoa-hoc" },
              { name: "Tiểu sử", icon: "users", slug: "tieu-su" },
              { name: "Lịch sử", icon: "book-marked", slug: "lich-su" },
              { name: "Tự phát triển", icon: "book-open", slug: "tu-phat-trien" },
              { name: "Thiếu nhi", icon: "book-text", slug: "thieu-nhi" },
              { name: "Tiểu thuyết", icon: "book-marked", slug: "tieu-thuyet" },
              { name: "Kỹ năng sống", icon: "users", slug: "ky-nang-song" },
              { name: "Trinh thám", icon: "book-text", slug: "trinh-tham" },
              { name: "Viễn tưởng", icon: "book-open", slug: "vien-tuong" },
            ].map((category, index) => (
               <Link
                  to={`/chi-tiet-loai-sach/${category.slug}`}
                  key={index}
                  className="flex flex-col items-center justify-center p-4 transform duration-500 rounded-lg bg-white hover:bg-amber-100 transition-transform border hover:-translate-y-3 shadow-md" 
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
                </Link>
              
            ))}
          </div>
          </div>
        </section>
        </MotionFadeIn> 

        {/* Benefits */}
        <section className="w-full py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <MotionFadeIn custom={1}>
                <div className="mx-auto lg:mx-0 relative order-2 lg:order-1">
                  <img
                    src="https://jnsbooksnplants.com.au/cdn/shop/articles/Benefits_of_Reading_Books.png?v=1699366331"
                    width="600"
                    height="400"
                    alt="Lợi ích của việc đọc sách"
                    className="rounded-lg object-cover"
                  />
                </div>
              </MotionFadeIn>
              <div className="space-y-4 order-1 lg:order-2">
                <MotionFadeIn custom={2}>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Lợi ích của việc đọc sách
                  </h2>
                </MotionFadeIn>
                <MotionFadeIn custom={2}>
                  <p className="text-muted-foreground md:text-lg ml-1">
                    Đọc sách không chỉ mang lại kiến thức mà còn nhiều lợi ích khác cho sức khỏe tinh thần và thể chất của
                    bạn.
                  </p>
                </MotionFadeIn>
                <ul className="space-y-4">
                  {[
                    "Tăng cường trí nhớ và khả năng tập trung",
                    "Giảm căng thẳng và cải thiện sức khỏe tinh thần",
                    "Mở rộng vốn từ vựng và kỹ năng giao tiếp",
                    "Phát triển khả năng đồng cảm và hiểu biết về thế giới",
                    "Cải thiện kỹ năng tư duy phản biện",
                  ].map((benefit, index) => (
                    <MotionFadeIn custom={index} key={index}>
                      <li key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-amber-100 p-1 mt-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 text-amber-600"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        </div>
                        <span>{benefit}</span>
                      </li>
                    </MotionFadeIn>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 bg-amber-50">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <MotionFadeIn custom={1}>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Độc giả nói gì về chúng tôi
                  </h2>
                </MotionFadeIn>
                <MotionFadeIn custom={2}>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Trải nghiệm của những người yêu sách trong cộng đồng của chúng tôi
                  </p>
                </MotionFadeIn>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[1, 2, 3].map((testimonial,index) => (
                <MotionFadeIn custom={index+2}>
                  <div key={testimonial} className="rounded-lg border border-black bg-background p-6 ease-in-out transform duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <img
                        src={`https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg`}
                        alt={`User ${testimonial}`}
                        className="rounded-full w-[50px] h-[50px] object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">Nguyễn Văn A</h3>
                        <div className="flex mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 fill-amber-500 text-amber-500"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-muted-foreground">
                      "Tôi đã tìm thấy rất nhiều cuốn sách hay trên trang web này. Giao diện dễ sử dụng và cộng đồng rất
                      thân thiện. Tôi đặc biệt thích phần thảo luận sau mỗi cuốn sách."
                    </p>
                  </div>
                </MotionFadeIn> 
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="w-full py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <MotionFadeIn>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Đăng ký nhận thông tin</h2>
                </MotionFadeIn>
                <MotionFadeIn custom={1}>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                    Nhận thông báo về sách mới và các sự kiện đọc sách
                  </p>
                </MotionFadeIn> 
              </div>
              <div className="w-full max-w-md space-y-2">
                <MotionFadeIn custom={2}>
                  <form className="flex w-full max-w-sm items-center space-x-2 ml-8">
                    <input
                      type="email"
                      placeholder="Email của bạn"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-md text-white text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-amber-500 text-primary-foreground hover:bg-amber-600 h-10 px-4 py-2"
                    >
                      Đăng ký
                    </button>
                  </form>
                </MotionFadeIn>
                <MotionFadeIn custom={3}>
                  <p className="text-sm text-muted-foreground">
                    Chúng tôi tôn trọng quyền riêng tư của bạn. Bạn có thể hủy đăng ký bất cứ lúc nào.
                  </p>
                </MotionFadeIn> 
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
    </Layout>
  )
}
