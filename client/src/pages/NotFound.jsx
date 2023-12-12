function NotFound() {
    return (
        <main class="grid min-h-full bg-white px-6 py-6">
            <div class="text-center mt-36">
                <p class="text-6xl font-semibold text-indigo-600">404</p>
                <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Không tìm thấy trang</h1>
                <p class="mt-6 text-base leading-7 text-gray-600">
                    Xin lỗi, chúng tôi không thể tìm thấy trang bạn muốn truy cập.
                </p>
                <div class="mt-10 flex items-center justify-center gap-x-6">
                    <a
                        href="/"
                        class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Trở lại trang chủ
                    </a>
                </div>
            </div>
        </main>
    );
}

export default NotFound;
