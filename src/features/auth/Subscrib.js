import { useState, useEffect } from "react";
import { useAddNewTeacherMutation } from "../usersApiSlice";
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Sub from '../../components/Subs';

const USER_REGEX = /^[أ-ي]{3,20}<span class="math-inline">/;
const PWD_REGEX = /^[أ-ي0-9!@\#</span>٪]{4,12}$/;

const NewUserForm = () => {
  const [addNewTeacher, { 
     isLoading,
     isSuccess,
     isError, 
     error 
    }] = useAddNewTeacherMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [file, setFile] = useState(""); 
  const [address, setAddress] = useState(""); 
  const [roles ,setRoles] = useState("teacher" );

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setPhoneNumber("");
      setEmail("");
      setAddress("");
      navigate("/");
      
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPhoneNumberChanged = (e) => setPhoneNumber(e.target.value);
  const onAddressChanged = (e) => setAddress(e.target.value);
  const onRolesChanged = (e) => setRoles(e.target.value);


  const canSave =
  [username, password,roles.length, email, phoneNumber, address].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    console.log("Save button clicked");
    if (canSave) {
      try {
        console.log("Saving user...");
        await addNewTeacher({
          username,
          password,
          email,
          roles,
          phoneNumber,
          address,
        });
        navigate('/');
      } catch (error) {
        // Handle error (log or display to the user)
        console.error("Error saving user:", error);
      }
    }
  };
  
  
      
      const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };

  const errClass = isError ? "text-red-500" : "hidden";
  const validUserClass = !validUsername ? "border-red-500" : "";
  const validPwdClass = !validPassword ? "border-red-500" : "";

  return (
    <section className=" bg-primary full-screen">
      
        <div className="max-w-screen-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <p className={`${errClass} mb-4 text-sm font-medium text-center`}>{error?.data?.message}</p>

      <form onSubmit={onSaveUserClicked} className="space-y-4">
        <h2 className="text-3xl text-center font-bold mb-6 text-gray-700">إنشاء حساب جديد</h2>
  <Sub/>
        <div className="mb-4">
          <label htmlFor="username" className="block text-right text-sm font-bold mb-2">
            اسم المستخدم: <span className="text-xs">[3-20 حرف]</span>
          </label>
          <input
            id="username"
            type="text"
            placeholder="أدخل اسم المستخدم"
            dir="rtl"
            autoComplete="off"
            value={username}
            onChange={onUsernameChanged}
            className={`w-full p-3 border rounded ${validUserClass}`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-right text-sm font-bold mb-2">
            كلمة السر: <span className="text-xs">[4-12 حرف وأرقام ورموز]</span>
          </label>
          <input
            id="password"
            type="password"
            placeholder="أدخل كلمة السر"
            dir="rtl"
            value={password}
            onChange={onPasswordChanged}
            className={`w-full p-3 border rounded ${validPwdClass}`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-right text-sm font-bold mb-2">
             البريد الإلكتروني المهني: <span className="text-xs">[أدخل البريد الإلكتروني]</span>
          </label>
          <input
            id="email"
            type="text"
            placeholder="أدخل البريد الإلكتروني"
            dir="rtl"
            value={email}
            onChange={onEmailChanged}
            className={`w-full p-3 border rounded ${validUserClass}`}
          />
        </div>         
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-right text-sm font-bold mb-2">
            رقم الهاتف: <span className="text-xs">[أدخل رقم الهاتف]</span>
          </label>
          <input
            id="phoneNumber"
            type="text"
            placeholder="أدخل رقم الهاتف"
            dir="rtl"
            value={phoneNumber}
            onChange={onPhoneNumberChanged}
            className={`w-full p-3 border rounded ${validUserClass}`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-right text-sm font-bold mb-2">
            العنوان: <span className="text-xs">[أدخل العنوان]</span>
          </label>
          <input
            id="address"
            type="text"
            placeholder="أدخل العنوان"
            dir="rtl"
            value={address}
            onChange={onAddressChanged}
            className={`w-full p-3 border rounded ${validUserClass}`}
          />
        </div>
        <div className="mb-4">
        <label htmlFor="address" className="block text-right text-sm font-bold mb-2">
            الدليل: <span className="text-xs">[ صورة للبطاقة المهنية]</span>
            
                </label>
                <input
                  type="file"
                  id="pdfFile"
                  className="w-full p-3 border rounded"
                  onChange={handleFileChange}
                />
              </div>
       <button
  type="submit"
  className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded ${
    !canSave || isLoading ? "opacity-50 cursor-not-allowed" : ""
  }`}
  disabled={!canSave}
  onClick={onSaveUserClicked} // Add onClick attribute here
>
  <FontAwesomeIcon icon={faSave} className="mr-2" />
  حفظ
</button>

          <FontAwesomeIcon icon={faSave} className="mr-2" />
          حفظ
        </button>
        <Link to="/" className="text-primary text-right hover:underline mt-4  mb-4" dir="rtl">
                        العودة إلى الصفحة الرئيسية
                    </Link>
      </form> 
     
    </div>
    </section>
  );
};

export default NewUserForm;
