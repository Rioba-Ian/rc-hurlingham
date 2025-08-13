import {
 Body,
 Button,
 Container,
 Font,
 Head,
 Heading,
 Html,
 Img,
 Link,
 Preview,
 Section,
 Tailwind,
 Text,
} from "@react-email/components";

interface VerifySubscriptionEmailProps {
 verificationUrl?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const VerifySubscriptionEmail = ({
 verificationUrl,
}: VerifySubscriptionEmailProps) => {
 return (
  <Html>
   <Tailwind>
    <Head>
     <title>Confirm your newsletter subscription to RAC Hurlingham</title>
     <Font
      fontFamily="Inter"
      fallbackFontFamily="Arial"
      webFont={{
       url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
       format: "woff2",
      }}
      fontWeight={400}
      fontStyle="normal"
     />
    </Head>
    <Preview>Confirm your newsletter subscription to RAC Hurlingham</Preview>
    <Body className="bg-white">
     <Preview>Confirm your newsletter subscription to RAC Hurlingham</Preview>
     <Container className="bg-white">
      <Img
       src={`https://res.cloudinary.com/drxurk7lu/image/upload/v1752770026/small_Rotaract_Logo_EN_21_4_1_54fb915610.png`}
       width="240"
       height="120"
       alt="RAC Hurlingham"
       className="my-4 mx-auto"
      />

      <Text className="text-2xl font-bold">
       Confirm Your Newsletter Subscription
      </Text>

      <Section className="bg-gray-100 rounded-lg p-4">
       <Text className="text-lg">Hello!</Text>
       <Text className="text-lg">
        Thank you for subscribing to the RAC Hurlingham newsletter. To complete
        your subscription, please click the button below to verify your email
        address.
       </Text>

       <Button
        className="bg-[#ff6467] text-white px-4 py-2 rounded-md"
        href={verificationUrl}
       >
        Confirm Subscription
       </Button>
      </Section>

      <Text className="text-sm font-light">
       This verification link will expire in 24 hours. If you didn&apos;t
       request this subscription, you can safely ignore this email.
      </Text>

      <Text className="text-lg">
       RAC Hurlingham Club • Stay connected with our latest updates and events
      </Text>
     </Container>
    </Body>
   </Tailwind>
  </Html>
 );
};

VerifySubscriptionEmail.PreviewProps = {
 email: "member@example.com",
 verificationUrl:
  "https://rc-hurlingham.riobaian.space.com/api/newsletter/verify?token=example-token",
} as VerifySubscriptionEmailProps;

export default VerifySubscriptionEmail;
