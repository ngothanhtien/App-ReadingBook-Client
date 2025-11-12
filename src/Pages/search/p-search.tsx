"use client"

import type React from "react"
import { useState } from "react"
import {useNavigate} from "react-router-dom"
import Layout from "../../components/layout-masterpage"
import allBooks from "../../service/mockdatabook"
import MotionFadeIn from "../../components/animation_scroll"
import LoginPromptModal from "../../components/dialog";
interface Book {
  id: number
  title: string
  author: string
  category: string
  rating: number
  reviewCount: number
  coverUrl: string
  slug: string
  description: string
  price: number,
  link: string,
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("none")
  const [currentPage, setCurrentPage] = useState(1)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const resultsPerPage = 12
  const navigate = useNavigate();

  const categories = [
    { value: "all", label: "Tất cả thể loại" },
    { value: "Văn học", label: "Văn học" },
    { value: "Tự phát triển", label: "Tự phát triển" },
    { value: "Lịch sử", label: "Lịch sử" },
    { value: "Trinh thám", label: "Trinh thám" },
    { value: "Kinh doanh", label: "Kinh doanh" },
  ]
  const handleViewDetailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const user = localStorage.getItem("user");
    if (!user) {
      e.preventDefault(); 
      setShowLoginPrompt(true); 
    }
  }
  const handleLogin = () => {
    setShowLoginPrompt(false);
    navigate("/login"); // hoặc chuyển hướng đến trang đăng nhập
  };
  // Hàm tìm kiếm
  const performSearch = (query: string, category: string) => {
    setIsLoading(true)

    // Giả lập delay API
    setTimeout(() => {
      let results = allBooks

      // Lọc theo từ khóa
      if (query.trim()) {
        results = results.filter(
          (book) =>
            book.title.toLowerCase().includes(query.toLowerCase().trim()) ||
            book.author.toLowerCase().includes(query.toLowerCase().trim()) ||
            book.description.toLowerCase().includes(query.toLowerCase().trim()),
        )
      }

      // Lọc theo thể loại
      if (category !== "all") {
        results = results.filter((book) => book.category === category)
      }

      // Sắp xếp
      switch (sortBy) {
        case "title":
          results.sort((a, b) => a.title.localeCompare(b.title))
          break
        case "author":
          results.sort((a, b) => a.author.localeCompare(b.author))
          break
        case "rating":
          results.sort((a, b) => b.rating - a.rating)
          break
        default:
          // relevance - giữ nguyên thứ tự
          break
      }

      setSearchResults(results)
      setIsLoading(false)
      setHasSearched(true)
      setCurrentPage(1)
    }, 1000)
  }

  // Xử lý tìm kiếm
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(searchQuery, selectedCategory)
  }

  // Xử lý thay đổi thể loại
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  // Xử lý thay đổi sắp xếp
  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    if (hasSearched) {
      performSearch(searchQuery, selectedCategory)
    }
  }

  // Tính toán pagination
  const totalPages = Math.ceil(searchResults.length / resultsPerPage)
  const startIndex = (currentPage - 1) * resultsPerPage
  const endIndex = startIndex + resultsPerPage
  const currentResults = searchResults.slice(startIndex, endIndex)

  return (
    <Layout>
      <div className="min-h-[calc(100vh-80px)] bg-amber-50/30 mt-16">
        {/* Header Section */}
        <section className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl py-8">
            <MotionFadeIn>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Tìm kiếm sách</h1>
                    <p className="text-gray-600">Khám phá hàng nghìn cuốn sách hay</p>
                </div>
            </MotionFadeIn>
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block text-base w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Tìm kiếm theo tên sách, tác giả..."
                  />
                </div>

                {/* Category Filter */}
                <div className="md:w-48">
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-7 py-3 font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                  ) : (
                    "Tìm kiếm"
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            {hasSearched && (
              <>
                {/* Results Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {searchResults.length > 0 ? (
                        <>
                          Tìm thấy {searchResults.length} kết quả
                          {searchQuery && (
                            <>
                              {" "}
                              cho "<span className="text-amber-600">{searchQuery}</span>"
                            </>
                          )}
                        </>
                      ) : (
                        "Không tìm thấy kết quả"
                      )}
                    </h2>
                    {searchQuery && (
                      <p className="text-sm text-gray-600 mt-1">
                        Thể loại: {categories.find((c) => c.value === selectedCategory)?.label}
                      </p>
                    )}
                  </div>

                  {searchResults.length > 0 && (
                    <div className="flex items-center gap-2">
                      <label htmlFor="sort" className="text-base text-gray-600">
                        Sắp xếp:
                      </label>
                      <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="text-base border border-gray-300 rounded-md px-6 py-1 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        >
                        <option value="none">Mặc định</option>
                        <option value="title">Tên sách</option>
                        <option value="author">Tác giả</option>
                        <option value="rating">Đánh giá</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Loading State */}
                {isLoading && (
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
                      <span className="text-gray-600">Đang tìm kiếm...</span>
                    </div>
                  </div>
                )}

                {/* No Results */}
                {!isLoading && searchResults.length === 0 && (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy sách nào</h3>
                    <p className="text-gray-600 mb-4">Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc</p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>Gợi ý:</p>
                      <ul className="space-y-1">
                        <li>• Kiểm tra chính tả từ khóa</li>
                        <li>• Sử dụng từ khóa ngắn gọn hơn</li>
                        <li>• Thử tìm theo tên tác giả</li>
                        <li>• Chọn "Tất cả thể loại" để mở rộng kết quả</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Results Grid */}
                {!isLoading && currentResults.length > 0 && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {currentResults.map((book) => (
                        <div
                          key={book.id}
                          className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
                        >
                          <div className="aspect-[3/4] overflow-hidden">
                            <img
                              src={book.coverUrl || "/placeholder.svg"}
                              alt={book.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4">
                            <div className="mb-2">
                              <span className="inline-block px-2 py-1 text-sm font-medium bg-amber-100 text-amber-800 rounded-full">
                                {book.category}
                              </span>
                            </div>
                            <h3 title={book.title}  className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">{book.title}</h3>
                            <p title={book.author} className="text-base text-gray-600 mb-2 line-clamp-1">Tác giả: {book.author}</p>
                            <p title={book.description} className="text-base text-gray-500 mb-3 line-clamp-1">{book.description}</p>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                      key={star}
                                      className={`h-4 w-4 ${
                                        star <= Math.floor(book.rating)
                                          ? "text-amber-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500 ml-1">({book.reviewCount})</span>
                              </div>
                            </div>
                            <a
                              href={`${book.link}`}
                              target="_blank"
                              onClick={handleViewDetailClick}
                              className="block w-full text-center py-2 px-4 text-amber-600  hover:bg-amber-100 transition-transform duration-500 text-sm font-medium hover:-translate-y-1"
                            >
                              Xem chi tiết
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center mt-8">
                        <nav className="flex items-center space-x-1">
                          <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Trước
                          </button>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-3 py-2 text-sm font-medium border ${
                                currentPage === page
                                  ? "bg-amber-600 text-white border-amber-600"
                                  : "text-gray-500 bg-white border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                          <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Sau
                          </button>
                        </nav>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {/* Initial State */}
            {!hasSearched && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
                  <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Bắt đầu tìm kiếm</h3>
                <p className="text-gray-600">Nhập từ khóa để tìm kiếm sách yêu thích của bạn</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <LoginPromptModal
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        onLogin={handleLogin}
      />
    </Layout>
  )
}
