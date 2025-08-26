import Layout from "../../components/layout-masterpage";
import { useState,useEffect } from "react";
import personalPicture from "../../assets/personal_picture.jpg";
import MotionFadeIn from "../../components/animation_scroll";
import { FaPhone,FaEnvelope,FaMapPin,FaBook,FaPersonBooth,FaBookOpen } from "react-icons/fa";
import validators from "../../error/general_error"
const members =[
  {
    name: "Ngô Thành Tiến",
    role: "Nhà sáng lập",
    quote: "Sách là cánh cửa mở ra thế giới mới.",
    image: personalPicture,
  },
  {
    name: "Nguyễn Văn A",
    role: "Quản lý nội dung",
    quote: "Đọc sách là chìa khóa mở ra tri thức.",
    image: "https://stockdep.net/files/images/15335274.jpg",
  },
  {
    name: "Trần Thị B",
    role: "Chuyên viên truyền thông",
    quote: "Sách là người bạn đồng hành tuyệt vời.",
    image: "https://img.lovepik.com/free-png/20211107/lovepik-lovely-young-college-students-png-image_400451673_wh1200.png",
  },
]
export default function AboutPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fullname,setFullname] = useState("");
  const [email,setEmail] = useState("");
  const [title_message,setTitleMessage] = useState("");
  const [content_message,setContent_message] = useState("");
  const [isCheckSend,setCheckSend] = useState(true);
  const [isloading,setIsloading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const BASE_URL = "http://localhost:5000/api/users";
  const getDataUser = async () => {
        const token = localStorage.getItem("accessToken");
        const user = localStorage.getItem("user");
        if(!user){
          setCheckSend(false);
          return;
        }
        if(!token) return;
  
        try {
            const response = await fetch(`${BASE_URL}/current`,{
              method: "GET",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              }
            })
            const data = await response.json();
            if(response.ok){
              setCheckSend(true);
              setFullname(data.fullname);
              setEmail(data.email);
            }else{
              console.error("Lỗi:", data.message);
            }
        } catch (error) {
          console.error("Lỗi kết nối: ",error);
        }
    }
    useEffect(()=>{
      getDataUser();
    },[]);

  const setFieldError = (field: string, message?: string) => {
    setErrors(prev => {
      if(!message){
        const {[field]: _, ...rest} = prev;
        return rest;
      }
      return {...prev, [field]:message};
    })
  }
  const hanlerFullname = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setFullname(value);
    if(!value.trim()){
      setFieldError("fullname","❌ Vui lòng họ và tên!");
    }else if(!validators.onlyRegularChar(value)){
      setFieldError("fullname","❌ Họ và tên không được chứa ký tự đặc biệt hoặc số!");
    }else if(value.length < 5  || value.length > 28){
      setFieldError("fullname","❌ Họ và tên phù hợp từ 5-28 ký tự");
    }else{
      setFieldError("fullname");
    }
  }
  const handlerEmail =(e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setEmail(value);
    if(!value.trim()){
      setFieldError("email", "❌ Vui lòng nhập email của bạn!");
    }else if(!validators.isValidEmail(value)){
      setFieldError("email", "❌ Email không đúng định dạng!");
    }else{
      setFieldError("email");
    }
  }
  const handlerTitleMessage =(e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setTitleMessage(value);
    if(!value.trim()){
      setFieldError("title_ms", "❌ Vui lòng nhập tiêu đề tin nhắn!");
    }else if(!validators.onlyRegularChar(value)){
      setFieldError("title_ms", "❌ Tên tiêu đề không hợp lệ!");
    }else if(value.length < 3 || value.length > 100){
      setFieldError("title_ms", "❌ Tiêu đề tin nhắn giới hạn trong khoảng từ 3 - 100 ký tự!");
    }else{
      setFieldError("title_ms");
    }
  }
  const handlerContentMessage =(e: React.ChangeEvent<HTMLTextAreaElement>) =>{
    const value = e.target.value;
    setContent_message(value);
    if(!value.trim()){
      setFieldError("content_ms", "❌ Vui lòng nhập nội dung tin nhắn!");
    }else if(value.length < 10 || value.length > 1000){
      setFieldError("content_ms", "❌ Nội dung tin nhắn giới hạn trong khoảng từ 10 - 1000 ký tự!");
    }else{
      setFieldError("content_ms");
    }
  }
  const validateAllfield = () => {
    let isValid  = true;
    if(!fullname.trim()){
      setFieldError("fullname", "❌ Vui lòng nhập họ và tên!");
      isValid = false;
    }
    if(!email.trim()){
      setFieldError("email", "❌ Vui lòng nhập email của bạn!");
      isValid = false;
    }
    if(!title_message.trim()){
      setFieldError("title_ms", "❌ Vui lòng tiêu đề tin nhắn!");
      isValid = false;
    }
    if(!content_message.trim()){
      setFieldError("content_ms", "❌ Vui lòng nhập nội dung tin nhắn!");
      isValid = false;
    }
    return isValid;
  }
  const handlerSendResponseMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEmptyValid = validateAllfield();
    if(!isEmptyValid) return;
    setIsloading(true);
    try {
      const response = await fetch(`${BASE_URL}/send-response-message`,{
        method: "POST",
        headers: {
          "Content-type":  "application/json"
        },
        body: JSON.stringify({fullname,email,title_message,content_message})
      });
      const data = await response.json();
      if(response.ok){
        setTimeout(() => {
          setIsloading(false);
          setSuccessMessage(`✅ ${data.message}` || "✅ Gửi tin nhắn thành công!");
          if(!localStorage.getItem("user")){
            setContent_message("");
            setTitleMessage("");
            setFullname("");
            setEmail("");
          }else{
            setContent_message("");
            setTitleMessage("");
          }
          setFieldError("sendFail");
        }, 2000);
      }else{
        setTimeout(() => {
          setIsloading(false);
          setFieldError("sendFail",`❌ ${data.message}` || "❌ Đã có lỗi xảy ra trong quá trình gửi!");
          setSuccessMessage("")
        }, 2000);
      }
    } catch (error) {
      setTimeout(() => {
        setIsloading(false);
        console.log("Lỗi server: ",error);
      }, 2000);
    }
  }
  return (
    <Layout>
      <section className="w-full py-12 md:py-24 bg-amber-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <MotionFadeIn>
                <h1 className="font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Giới thiệu về ReadingCorner
              </h1>
              </MotionFadeIn>
              <MotionFadeIn custom={1}>
                <p className="max-w-[900px] text-stone-500 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                  ReadingCorner xin chào "Book Lover ♥️". ReadingCorner là một nền tảng trực tuyến dành cho những người yêu thích đọc sách và chia sẻ kiến thức.
                </p>
              </MotionFadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <MotionFadeIn>
                <h2 className="text-5xl font-bold tracking-tighter mb-10">Câu chuyện của chúng tôi</h2>
              </MotionFadeIn>
              <MotionFadeIn custom={1}>
                <p className="text-muted-foreground text-stone-700 md:text-xl">
                ReadingCorner được thành lập vào đầu năm 2025 với mục tiêu tạo ra một cộng đồng cho những người yêu sách.
                Chúng tôi tin rằng sách không chỉ là nguồn kiến thức mà còn là cầu nối giữa con người với nhau.
                </p>
              </MotionFadeIn>
              <MotionFadeIn custom={1}>
                <p className="text-muted-foreground text-stone-700 md:text-xl">
                Từ một nhóm nhỏ những người đam mê đọc sách, chúng tôi đã phát triển thành một cộng đồng lớn với hàng
                nghìn thành viên trên khắp Việt Nam. Mỗi ngày, chúng tôi đều nỗ lực để mang đến cho độc giả những cuốn
                sách hay nhất và tạo ra không gian để mọi người có thể chia sẻ về những cuốn sách họ yêu thích.
                </p>
              </MotionFadeIn>
            </div>
            <MotionFadeIn custom={2}>
              <div className="mx-auto h-[700px] w-full lg:mx-0 relative">
              <img
                src="https://www.shutterstock.com/image-photo/new-york-usa-march-3-600nw-2463514493.jpg"
                alt="Câu chuyện của ReadingCorner"
                className="h-full w-full rounded-lg object-fix"
              />
            </div>
            </MotionFadeIn>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 bg-amber-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-10">
            <MotionFadeIn>
              <h2 className="text-4xl font-bold tracking-tighter">Sứ mệnh của chúng tôi</h2>
            </MotionFadeIn>
            <MotionFadeIn custom={1}>
              <p className="max-w-[900px] text-stone-500 mx-auto mt-4 text-muted-foreground md:text-lg">
              Chúng tôi cam kết xây dựng một cộng đồng đọc sách lớn mạnh và lan tỏa văn hóa đọc đến mọi người.
              </p>
            </MotionFadeIn>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MotionFadeIn>
              <div className="bg-white p-6 rounded-lg shadow-sm border-2">
              <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center mb-4">
                <FaBookOpen className="text-amber-500 text-3xl"></FaBookOpen>
              </div>
              <h3 className="text-xl font-bold mb-2">Chia sẻ kiến thức</h3>
              <p className="text-muted-foreground">
                Chúng tôi tin rằng kiến thức nên được chia sẻ rộng rãi. Thông qua các cuốn sách, chúng tôi muốn mang đến
                cho mọi người cơ hội tiếp cận với những ý tưởng mới và mở rộng tầm nhìn.
              </p>
            </div>
            </MotionFadeIn>
            <MotionFadeIn custom={1}>
              <div className="bg-white p-6 rounded-lg shadow-sm border-2">
              <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center mb-4">
                <FaPersonBooth className="text-amber-500 text-3xl"></FaPersonBooth>
              </div>
              <h3 className="text-xl font-bold mb-2">Xây dựng cộng đồng</h3>
              <p className="text-muted-foreground">
                Chúng tôi tạo ra một không gian an toàn và thân thiện để mọi người có thể thảo luận về sách, chia sẻ ý
                kiến và kết nối với những người có cùng sở thích.
              </p>
            </div>
            </MotionFadeIn>
            <MotionFadeIn custom={2}>
              <div className="bg-white p-6 rounded-lg shadow-sm border-2">
              <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center mb-4">
                <FaBook className="text-amber-500 text-3xl"></FaBook>
              </div>
              <h3 className="text-xl font-bold mb-2">Khuyến khích đọc sách</h3>
              <p className="text-muted-foreground">
                Chúng tôi tin rằng đọc sách là một thói quen tốt cần được khuyến khích. Chúng tôi tổ chức các sự kiện,
                thảo luận và thử thách đọc sách để thúc đẩy văn hóa đọc.
              </p>
            </div>
            </MotionFadeIn>     
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-10">
            <MotionFadeIn>
              <h1 className="text-4xl font-bold tracking-tighter">Đội ngũ của chúng tôi</h1>
            </MotionFadeIn>
            <MotionFadeIn custom={1}>
              <p className="max-w-[900px] text-stone-500 mx-auto mt-4 text-muted-foreground md:text-lg">
              Những người đam mê sách và luôn nỗ lực mang đến trải nghiệm tốt nhất cho cộng đồng.
              </p>
            </MotionFadeIn>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {members.map((member, index) => (
              <MotionFadeIn
                key={index}
                custom={index}
                className="w-full sm:w-[calc(50%-12px)] md:w-[calc(25%-18px)] text-center"
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={`Thành viên ${index + 1}`}
                    width="128"
                    height="128"
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <p className="text-sm mt-2">"{member.quote}"</p>
              </MotionFadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-amber-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center">
            <MotionFadeIn>
              <h2 className="text-4xl font-bold tracking-tighter">Liên hệ với chúng tôi</h2>
            </MotionFadeIn>
            <MotionFadeIn custom={1}>
              <p className="max-w-[600px] text-stone-500 mx-auto mt-4 text-muted-foreground md:text-lg">
              Chúng tôi luôn sẵn sàng lắng nghe ý kiến và câu hỏi của bạn.
              </p>
            </MotionFadeIn>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="space-y-4">
              <MotionFadeIn>
                <div className="flex items-start gap-3">
                <div className="rounded-full bg-amber-100 p-3 mt-1">
                  <FaPhone className="text-amber-500 text-lg"></FaPhone>
                </div>
                <div>
                  <h3 className="font-semibold">Điện thoại</h3>
                  <p className="text-muted-foreground">+84 905125994</p>
                </div>
              </div>
              </MotionFadeIn>
              <MotionFadeIn custom={1}>
                <div className="flex items-start gap-3">
                <div className="rounded-full bg-amber-100 p-3 mt-1">
                  <FaEnvelope className="text-amber-500 text-lg"></FaEnvelope>
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">ngothanhtien1406@gmail.com</p>
                </div>
              </div>
              </MotionFadeIn> 
              <MotionFadeIn custom={2}>
                <div className="flex items-start gap-3">
                <div className="rounded-full bg-amber-100 p-3 mt-1">
                  <FaMapPin className="text-amber-500 text-lg"></FaMapPin>
                </div>
                <div>
                  <h3 className="font-semibold">Địa chỉ</h3>
                  <p className="text-muted-foreground">Thanh Khê, Đà Nẵng</p>
                </div>
              </div>
              </MotionFadeIn>
            </div>
            <MotionFadeIn custom={3}>
              <form className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
                {errors.sendFail && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 text-base rounded-md border border-red-200">{errors.sendFail}</div>
                )}
                {successMessage && (
                  <div className="mb-4 p-3 bg-green-50 text-green-700 text-base rounded-md border border-green-200">
                    {successMessage}
                  </div>
                )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-base font-medium">
                    Họ và tên
                  </label>
                  <input
                    id="name"
                    type="text"
                    onChange={hanlerFullname}
                    value={fullname}
                    disabled = {isCheckSend}
                    className={`flex h-10 w-full ${isCheckSend ? "bg-gray-300":""} rounded-md border border-input bg-background px-2 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                    placeholder="Nguyễn Văn A"
                  />
                  {errors.fullname && <p className="text-red-600 text-sm mt-1">{errors.fullname}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-base font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    onChange={handlerEmail}
                    value={email}
                    disabled = {isCheckSend}
                    className={`flex h-10 w-full ${isCheckSend ? "bg-gray-300":""} rounded-md border border-input bg-background px-2 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                    placeholder="example@email.com"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-base font-medium">
                  Tiêu đề
                </label>
                <input
                  id="subject"
                  type="text"
                  value={title_message}
                  onChange={handlerTitleMessage}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Tiêu đề tin nhắn của bạn"
                />
                {errors.title_ms && <p className="text-red-600 text-sm mt-1">{errors.title_ms}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-base font-medium">
                  Nội dung
                </label>
                <textarea
                  id="message"
                  onChange={handlerContentMessage}
                  value={content_message}
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Nhập nội dung tin nhắn của bạn"
                ></textarea>
                {errors.content_ms && <p className="text-red-600 text-sm mt-1">{errors.content_ms}</p>}
              </div>
              <button
                type="submit"
                disabled={isloading}
                onClick={handlerSendResponseMessage}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
              >
                {isloading ? (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-[20px] w-[20px] text-white"
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
                ) : null}
                Gửi tin nhắn
              </button>
            </form>
            </MotionFadeIn>   
          </div>
        </div>
      </section>
    </Layout>
  )
}
