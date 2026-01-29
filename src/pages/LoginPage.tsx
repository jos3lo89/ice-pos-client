import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema, type LoginT } from "@/schemas/auth.schema";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginT>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const { mutate, isPending } = useAuth();

  const onSubmit = (values: LoginT) => {
    mutate(values, {
      onSuccess: () => {
        console.log("login ok -> ir ruta segun rol");
        navigate("/");
      },
    });
  };

  return (
    <div>
      <h1>LoginPage</h1>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register("userName")} />

          <div>
            {errors.userName && (
              <span className="text-red-600 text-sm">
                {errors.userName.message}
              </span>
            )}
          </div>

          <input type="password" {...register("password")} />

          <div>
            {errors.password && (
              <span className="text-red-600 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <button disabled={isPending} type="submit">
            {isPending ? "Ingresando" : "login"}
          </button>
          <div>
            {errors.root && (
              <span className="text-red-600 text-sm">
                {errors.root.message}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
