import { Contact2 } from "@/components/molecules/Contact";

export const metadata = {
 title: "Contact Us | Rotaract Club of Hurlingham",
 description:
  "Get in touch with the Rotaract Club of Hurlingham. We'd love to hear from you about questions, feedback, or collaboration opportunities.",
};

export default function Contact() {
 return (
  <main>
   <Contact2
    title="Contact Us"
    description="We're here to help! Get in touch with the Rotaract Club of Hurlingham for any inquiries, feedback, or collaboration opportunities."
    email="hello@rotaracthurlingham.com"
    phone="+54 11 4567-8900"
    address="Hurlingham, Buenos Aires, Argentina"
   />
  </main>
 );
}
