import UserRepository from "~~/repositories/UserRepository";
import * as yup from "yup";

const schema = yup.object().shape({
    email: yup.string().email().required("email_field"),
    password: yup.string().min(6, "password_field").required("password_field"),
});



export const useRegister = () => {
    const router = useRouter();

    const email = ref("");
    const emailError = ref(false);

    const password = ref("");
    const passwordError = ref(false);

    const isLoading = ref(false);

    const paramsNotif = reactive({
        show: false,
        title: "",
        subtitle: "",
        type: "",
    });

    const userRepository = <UserRepository>useState("userRepository").value;

    const onSubmit = async () => {
        paramsNotif.show = false;
        paramsNotif.title = "";
        paramsNotif.subtitle = "";

        emailError.value = false;
        passwordError.value = false;

        isLoading.value = true;

        try {
            const isValid = schema.validateSync(
                {
                    email: email.value,
                    password: password.value,
                },
                { abortEarly: false }
            );

            if (!isValid) {
                emailError.value = true;

                return;
            }

            await userRepository.createAccount({
                email: email.value,
                password: password.value,
            });

            router.push({
                name: "adminer",
            });
        } catch (error) {
            if (!error.errors) {
                if (error.message === "email-already-in-use") {
                    paramsNotif.show = true;
                    paramsNotif.title = "Erreur";
                    paramsNotif.subtitle =
                        "Vous ne pouvez pas créer de compte avec ces identifiants.";
                    paramsNotif.type = "error";
                }
            } else {
                error.errors.forEach((error) => {
                    if (error === "email_field") {
                        emailError.value = true;
                    }

                    if (error === "password_field") {
                        passwordError.value = true;
                    }
                });
            }
        }
    }

    return {
        email,
        emailError,
        password,
        passwordError,
        paramsNotif,
        onSubmit,
    }
}