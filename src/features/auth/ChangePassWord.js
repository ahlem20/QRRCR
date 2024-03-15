import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [persist, setPersist] = useState(false); // Assuming a default value
    const isMounted = useRef(true); // Variable to track component mount state

    const navigate = useNavigate();

    useEffect(() => {
        userRef.current && userRef.current.focus(); // Check if userRef.current exists before calling focus
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Assuming successful login, navigate to the dashboard
            navigate('/dashE');
        } catch (err) {
            if (isMounted.current) {
                setErrMsg('Error during login. Please try again.'); // Handle error appropriately
                errRef.current && errRef.current.focus(); // Check if errRef.current exists before calling focus
            }
        }
    };

    const handleUserInput = (e) => setUsername(e.target.value);
    const handlePwdInput = (e) => setPassword(e.target.value);
    const handleToggle = () => setPersist((prev) => !prev);

    const errClass = errMsg ? 'errmsg' : 'offscreen';

    return (
        <section className="min-h-screen flex items-center justify-center bg-cover bg-center relative" dir="rtl" style={{ backgroundImage: 'url("../bgtotal.png")' }}>
            <div className="w-full max-w-md">
                <header className="mb-4">
                    <h1 className="text-3xl text-white font-bold text-center">تغيير كلمة السر </h1>
                </header>
                <main className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <p ref={errRef} className={`${errClass} text-red-500 mb-4`} aria-live="assertive">
                        {errMsg}
                    </p>
                    <form onSubmit={handleSubmit}>
                        {/* ... rest of your code ... */} <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 text-m font-bold mb-2">
                                 كلمة السر جديدة:
                            </label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                type="text"
                                id="username"
                                ref={userRef}
                                onChange={handleUserInput}
                                value={password}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 text-m font-bold mb-2">
                                تأكيد كلمة المرور:
                            </label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                type="password"
                                id="password"
                                onChange={handlePwdInput}
                                value={password}
                                required
                            />
                        </div>
                        <div className="flex justify-center" > <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            تسجيل الدخول
                        </button></div>
                    <lebel htmlFor="persist" className="form_persist">
                                         
                        </lebel>   
                  
                    </form>
                </main>
                <footer className="text-center mt-4">
                    <Link to="/" className="text-blue-300 hover:underline">
                        العودة إلى الصفحة الرئيسية
                    </Link>
                </footer>
            </div>
        </section>
    );
};

export default Login;
