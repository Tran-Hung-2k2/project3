import image from '../assets/images/signin.jpg';

export default function SignIn({ children }) {
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="flex flex-col items-center justify-center w-3/5 gap-10">
                <img className="w-4/5 rounded-lg shadow-lg" src={image} alt="Coursera" />
            </div>
            {children}
        </div>
    );
}
