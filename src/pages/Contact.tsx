import { useTheme } from "@mui/material";
import React from "react";
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BusinessIcon from '@mui/icons-material/Business';
function ContactForm() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const contactFormData = {
    title: "Contact us",
    formFields: [
      {
        label: "Name",
        id: "name",
        type: "text",
        placeholder: "Name",
      },
      {
        label: "Email",
        id: "email",
        type: "email",
        placeholder: "Enter your email address",
      },
      {
        label: "Message",
        id: "msg",
        type: "textarea",
        placeholder: "Your message",
      },
    ],
    button: {
      text: "Send",
      classes: "rounded bg-teal-400 px-6 py-2.5 text-white hover:bg-teal-500",
    },
    contactInfo: [
      {
        title: "Technical support",
        email: "Abrand@gamil.com",
        phone: "0106488094",
        iconPath: <PhoneCallbackIcon/>,
      },
      {
        title: "Sales questions",
        email: "Abrand@gamil.com",
        phone: "01064880594",
        iconPath: <TrendingUpIcon/>,
      },
      {
        title: "Our office",
        address: "21st Century St., Desouk, Egypt",
        phone: "0472585456",
        iconPath:<BusinessIcon/>,
      },
    ],
  };
  
  return (
    <div  className={`contact pt-[20px] ${ isDarkMode ?"bg-[#111827]":"bg-white" }`}>
      <div className="container mx-auto px-2 md:px-4">
        <section>
          <div className="flex justify-center">
            <div className="text-center md:max-w-xl lg:max-w-3xl">
              <h2 className="mb-12 px-6 text-3xl font-bold">{contactFormData.title}</h2>
            </div>
          </div>

          <div className="flex flex-wrap">
            <form className="mb-12 w-full md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
              {contactFormData.formFields.map((field, index) => (
                <div className="mb-3 w-full" key={index}>
                  <label className="block font-medium mb-[2px]" htmlFor={field.id}>
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      className="px-2 py-2 border rounded-md w-full outline-none"
                      id={field.id}
                      placeholder={field.placeholder}
                    ></textarea>
                  ) : (
                    <input
                      type={field.type}
                      className="px-2 py-2 border rounded-md w-full outline-none"
                      id={field.id}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
              <button
                type="button"
                className={`mb-6 inline-block w-full ${contactFormData.button.classes}`}
              >
                {contactFormData.button.text}
              </button>
            </form>

            <div className="w-full lg:w-7/12 flex items-center">    
              <div className="flex flex-wrap">
                {contactFormData.contactInfo.map((info, index) => (
                  <div className="mb-5 w-full md:w-6/12 md:px-3 lg:px-6" key={index}>
                    <div className="flex items-start">
                      <div className="shrink-0">
                        <div className="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                        <p className="mb-2 font-bold">{info.iconPath}</p>

                        </div>
                      </div>
                      <div className="ml-6 grow">
                        <p className="mb-2 font-bold">{info.title}</p>
                        <p className="text-neutral-500">{info.email}</p>
                        {info.phone && <p className="text-neutral-500">{info.phone}</p>}
                        {info.address && <p className="text-neutral-500">{info.address}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default ContactForm;
