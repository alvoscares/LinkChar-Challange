import { useFormik } from "formik";
import * as Yup from "yup";

import useAuth from "../utils/hooks/useAuth";

const schema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().min(4).required()

})

export const LoginWL = () => {
  const {fetchLogin} = useAuth()

  const submitForm = (values) => {
    fetchLogin({...values})
  };

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: submitForm,
    validationSchema: schema
  });

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          className="bg-white border-8 border-green-400"
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          className="bg-white border-8 border-green-400"
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button className="bg-white border-8 border-green-400" type="submit">
          LogIn
        </button>
        {errors.username && <span className="font-bold text-green-700">Usuario Invalido</span>}
        {errors.password && <span className="font-bold text-green-700">Password Invalido</span>}
      </form>
    </>
  );
};
