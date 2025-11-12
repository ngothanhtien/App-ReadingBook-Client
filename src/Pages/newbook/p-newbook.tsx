import Layout from "../../components/layout-masterpage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MotionFadeIn from "../../components/animation_scroll";
import { fetchBooksByCategory } from "../../service/request_api_type";
import { Root } from "../../model/book";
import LoginPromptModal from "../../components/dialog";
// import { Root } from "react-dom/client";

const sortCategory = [
  { value: "all",label: "Tất cả sách"},
  { value: "History",label: "Lịch sử"},
  { value: "Cooking",label: "Nấu ăn"},
  { value: "Health & Fitness",label: "Sức khỏe & thể hình"},
  { value: "Self-Help",label: "Phát triển bản thân"},
  { value: "Fiction",label: "Tiểu thuyết"},
  { value: "Psychology",label: "Tâm lý học"},
  { value: "Business", label: "Kinh doanh" },
  { value: "Trinh thám", label: "Trinh thám" },
]
const Book_per_page = 12;
const BookList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookFetch, setBooks] = useState<Root | null>(null);
  const [isloading, setLoading] = useState(false);
  const [category, setCategory] = useState<string>("all");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();

  const handleViewDetailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const user = localStorage.getItem("user");
    if (!user) {
      e.preventDefault(); 
      setShowLoginPrompt(true); 
    }
  };
  const handleLogin = () => {
    setShowLoginPrompt(false);
    navigate("/login"); // hoặc chuyển hướng đến trang đăng nhập
  };
  useEffect(()=>{
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await fetchBooksByCategory({
          category: category,
          maxResults: 12,
          orderBy: 'newest',
          startIndex: (currentPage - 1) *Book_per_page
        })
        setTimeout(() => {
          setBooks(response);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }finally{
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    };
    fetchBook();
  },[category,currentPage])

  const totalPages = Math.ceil((bookFetch?.totalItems || 0) / Book_per_page);
  return (
    <>
    <Layout>
      <section className="w-full bg-amber-50">
        <div className="relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="w-full">
              <MotionFadeIn>
                <img
                  className="w-full object-cover mt-0"
                  src="https://bizweb.dktcdn.net/100/197/269/themes/890698/assets/collection_image.jpg?1746434570160"
                  alt="Banner sách mới phát hành"
                />
              </MotionFadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <MotionFadeIn custom={2}>
              <div className="items-center gap-2 mr-0 auto">
                <label htmlFor="sort" className="text-lg mr-3">
                  Thể loại:
                </label>
                <select
                  id="sort"
                  name="sort"
                  className="border border-gray-300 rounded px-2 py-1 text-lg"
                  value={category}
                  onChange={(e) => setCategory(e.target.value || "history")}
                >
                  {sortCategory.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label ==="Phát triển bản thân" ? `${item.label} ⭐`: item.label}
                    </option>
                  ))}
                </select>
              </div>
            </MotionFadeIn>
          </div>
          {isloading && (
            <div className="flex justify-center items-center py-12">
              <div className="flex items-center space-x-2">
                <svg
                  className="animate-spin h-6 w-6 text-amber-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="text-gray-600">Đang lọc...</span>
              </div>
            </div>
          )}
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            { bookFetch?.items.length === 0 ? (
              <p className="font-semibold">Hiện tại không có sách thuộc thể loại '{category}'.</p>
            ) : ( isloading ? " ":
              bookFetch?.items.map((it_book) => (
                  <div className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-lg">
                    <div className="absolute top-2 right-2 z-10">
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                        Mới
                      </span>
                    </div>
                    <div className="aspect-[3/4] overflow-hidden">
                      {it_book.volumeInfo.imageLinks?.thumbnail ? (
                        <img
                          src={it_book.volumeInfo.imageLinks.thumbnail}
                          alt={it_book.volumeInfo.title || "Book cover"}
                          className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div>No Image</div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 title={it_book.volumeInfo.title} className="font-semibold text-xl mb-3">
                          {
                             it_book.volumeInfo.title !== null
                              ? it_book.volumeInfo.title.length > 20 ? it_book.volumeInfo.title.split('').slice(0, 20).join('') + '...'
                              : it_book.volumeInfo.title : "Title Unknown"
                          }
                      </h3>
                      <p
                        title={it_book.volumeInfo.authors?.join(", ")}
                        className="text-base text-muted-foreground mb-3"
                      >
                        Tác giả: {
                          it_book.volumeInfo.authors && it_book.volumeInfo.authors.length > 0
                            ? it_book.volumeInfo.authors[0].length > 18
                              ? it_book.volumeInfo.authors[0].slice(0, 18) + "..."
                              : it_book.volumeInfo.authors[0]
                            : "Unknown"
                        }
                      </p>
                      <p className="text-base text-muted-foreground mb-3">
                        Phát hành: {it_book.volumeInfo.publishedDate || "Unknown Date"}
                      </p>
                      <p title={it_book.volumeInfo.categories?.join(", ")} className="text-base text-muted-foreground mb-3">
                        Danh mục: {
                          it_book.volumeInfo.categories && it_book.volumeInfo.categories.length > 0
                          ? it_book.volumeInfo.categories[0].length > 18
                          ? it_book.volumeInfo.categories[0].slice(0, 18)+"..."
                          : it_book.volumeInfo.categories[0]
                          : "Unknown Category"
                        }
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill={star <= Math.floor(it_book.volumeInfo.averageRating || 4) ? "currentColor" : "none"}
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-[16px] w-[16px] text-amber-500"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({it_book.volumeInfo?.ratingsCount || 40} đánh giá)
                        </span>
                      </div>
                      <a
                        href={it_book.volumeInfo.infoLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleViewDetailClick}
                        className="mt-3 w-full text-base font-medium text-amber-600 hover:text-amber-700 hover:bg-amber-100 inline-flex items-center justify-center ring-offset-background transition-transform duration-500 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3"
                        aria-label={`Xem chi tiết sách ${it_book.volumeInfo.title || "Unknown Title"} trên Google Books`}
                      >
                        Xem chi tiết
                      </a>
                    </div>
                  </div>
              ))
            )}
          </div>
          <div className="flex justify-center mt-8">
            {(
              <nav className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0"
                >
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
                {Array.from({ length: bookFetch?.items?.length ?? 0 }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0 ${
                      currentPage === i + 1 ? "bg-amber-600 text-white hover:bg-amber-700" : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, bookFetch?.totalItems ?? 1))}
                  disabled={currentPage ===  bookFetch?.items.length}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0"
                >
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
            )}
          </div>
        </div>
      </section>

      {localStorage.getItem("accessToken") ==  null &&
        <LoginPromptModal
          isOpen={showLoginPrompt}
          onClose={() => setShowLoginPrompt(false)}
          onLogin={handleLogin}
        />
      }
    </Layout>
  </>
  
  );
};

export default BookList;