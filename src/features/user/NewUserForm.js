import { useState, useEffect } from "react";
import { useAddNewProjetMutation } from "./projetApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const USER_REGEX = /^[أ-ي]{3,20}$/;
const PWD_REGEX = /^[أ-ي0-9!@\#٪]{4,12}$/;

const NewUserForm = () => {
  const [addNewProjet, { isLoading, isSuccess, isError, error }] = useAddNewProjetMutation();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [validTitle, setValidTitle] = useState(false);
  const [module, setModule] = useState("");
  const [validMosetModule, setValidMosetModule] = useState("");
  const [teacherName, setTeacherName] = useState(""); // New state for teacher's name
  const [validTeacherName, setValidTeacherName] = useState(""); // New state for validation
  const [studentId, setStudentId] = useState("");
  const [pdfFile, setPdfFile] = useState(null); // New state for PDF file

  useEffect(() => {
    setValidTitle(USER_REGEX.test(title));
  }, [title]);

  useEffect(() => {
    setValidMosetModule(PWD_REGEX.test(module));
  }, [module]);

  useEffect(() => {
    setValidTeacherName(USER_REGEX.test(teacherName)); // Validation for teacher's name
  }, [teacherName]);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setModule("");
      setTeacherName(""); // Reset the teacher's name state
      setStudentId("");
      setPdfFile(null); // Reset the PDF file state
      navigate("/dashE");
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onMosetModuleChanged = (e) => setModule(e.target.value);
  const onTeacherNameChanged = (e) => setTeacherName(e.target.value); // Handler for teacher's name change
  const onDateChanged = (e) => setStudentId(e.target.value);
  const onPdfFileChange = (e) => setPdfFile(e.target.files[0]); // Handle PDF file change

  const canSave = [title, module, teacherName, studentId, pdfFile].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewProjet({
        title,
        module,
        teacherName, // Include the teacher's name in the request
        studentId,
        pdfFile, // Include the PDF file in the request
      });
    }
  };

  const errClass = isError ? "text-red-500" : "hidden";
  const validTitleClass = !validTitle ? "border-red-500" : "";
  const validMosetModuleClass = !validMosetModule ? "border-red-500" : "";
  const validTeacherNameClass = !validTeacherName ? "border-red-500" : ""; // Validation class for teacher's name

  return (
    <section className="max-w bg-primary">
      <div className="max-w-screen-md mx-auto p-8 bg-white rounded-lg shadow-md">
        <p className={`${errClass} mb-4 text-sm font-medium text-center`}>{error?.data?.message}</p>

        <form onSubmit={onSaveUserClicked} className="space-y-4">
          <h2 className="text-3xl text-center font-bold mb-6 text-gray-700">إنشاء مشروع جديد</h2>

          {[
            { id: "title", label: "عنوان المشروع", placeholder: "عنوان المشروع", state: title, onChange: onTitleChanged, validClass: validTitleClass },
            { id: "module", label: "الافواج المعنية بالمشروع", placeholder: "أدخل الافواج", state: module, onChange: onMosetModuleChanged, validClass: validMosetModuleClass },
            { id: "teacherName", label: "اسم الاستاذ", placeholder: "أدخل اسم الاستاذ", state: teacherName, onChange: onTeacherNameChanged, validClass: validTeacherNameClass },
            { id: "date", label: "يسلم المشروع قبل", placeholder: "أدخل تاريخ التسليم", state: studentId, onChange: onDateChanged },
            { id: "pdfFile", label: "تحميل ملف PDF", type: "file", onChange: onPdfFileChange, accept: ".pdf" },
          ].map((field) => (
            <div key={field.id} className="mb-4">
              <label htmlFor={field.id} className="block text-right text-sm font-bold mb-2">
                {field.label}:
              </label>
              {field.type === "file" ? (
                <input
                  id={field.id}
                  type={field.type}
                  onChange={field.onChange}
                  className={`w-full p-3 border rounded ${field.validClass}`}
                  accept={field.accept}
                />
              ) : (
                <input
                  id={field.id}
                  type="text"
                  placeholder={field.placeholder}
                  dir="rtl"
                  value={field.state}
                  onChange={field.onChange}
                  className={`w-full p-3 border rounded ${field.validClass}`}
                />
              )}
            </div>
          ))}
          
          <button
            type="submit"
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded ${
              !canSave || isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!canSave || isLoading}
          >
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            حفظ
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewUserForm;
