import { NavLink } from 'react-router-dom';

function Hero() {
    return (
        <div className="hero">
            <div className="flex-col hero-content lg:flex-row-reverse">
                <img
                    src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/5CFC8u8XiXcbSOlVv6JZQx/4e6f898f57f9d798437b3aa22026e30b/CourseraLearners_C_Composition_Hillary_copy__3_.png?auto=format%2Ccompress&dpr=2&w=459&h=497&q=40 2x, https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/5CFC8u8XiXcbSOlVv6JZQx/4e6f898f57f9d798437b3aa22026e30b/CourseraLearners_C_Composition_Hillary_copy__3_.png?auto=format%2Ccompress&dpr=3&w=459&h=497&q=40 3x"
                    className="rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-5xl font-bold">Khám phá kiến thức không giới hạn</h1>
                    <p className="py-6">
                        Bắt đầu, chuyển đổi, hoặc phát triển sự nghiệp của bạn với hơn 5,800 khóa học, Chứng chỉ Chuyên
                        Nghiệp, và bằng cấp từ những trường đại học và công ty hàng đầu trên thế giới.
                    </p>
                    <NavLink to="/signup" className="btn btn-primary">
                        Bắt đầu ngay
                    </NavLink>
                    <NavLink to="/signup?role=Organization" className="ml-4 btn btn-primary btn-outline">
                        Bắt đầu dành cho các tổ chức giáo dục
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Hero;
