import {
 Body,
 Button,
 Container,
 Head,
 Html,
 Img,
 Link,
 Preview,
 Section,
 Text,
} from "@react-email/components";

interface VerifySubscriptionEmailProps {
 email?: string;
 verificationUrl?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const VerifySubscriptionEmail = ({
 email,
 verificationUrl,
}: VerifySubscriptionEmailProps) => (
 <Html>
  <Head />
  <Body style={main}>
   <Preview>Confirm your newsletter subscription to RC Hurlingham</Preview>
   <Container style={container}>
    <Img
     src={`${baseUrl}/club_logo.png`}
     width="120"
     height="60"
     alt="RC Hurlingham"
     style={logo}
    />

    <Text style={title}>Confirm Your Newsletter Subscription</Text>

    <Section style={section}>
     <Text style={text}>Hello!</Text>
     <Text style={text}>
      Thank you for subscribing to the RC Hurlingham newsletter. To complete
      your subscription, please click the button below to verify your email
      address.
     </Text>

     <Button style={button} href={verificationUrl}>
      Confirm Subscription
     </Button>
    </Section>

    <Text style={text}>
     This verification link will expire in 24 hours. If you didn&apos;t request
     this subscription, you can safely ignore this email.
    </Text>

    <Text style={footer}>
     RC Hurlingham Club • Stay connected with our latest updates and events
    </Text>
   </Container>
  </Body>
 </Html>
);

VerifySubscriptionEmail.PreviewProps = {
 email: "member@example.com",
 verificationUrl:
  "https://yourdomain.com/api/newsletter/verify?token=example-token",
} as VerifySubscriptionEmailProps;

export default VerifySubscriptionEmail;

const main = {
 backgroundColor: "#ffffff",
 color: "#333333",
 fontFamily:
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
 maxWidth: "480px",
 margin: "0 auto",
 padding: "20px 0 48px",
};

const logo = {
 margin: "0 auto",
 display: "block",
 marginBottom: "24px",
};

const title = {
 fontSize: "24px",
 lineHeight: 1.25,
 textAlign: "center" as const,
 marginBottom: "24px",
 color: "#1a1a1a",
};

const section = {
 padding: "24px",
 border: "solid 1px #e1e5e9",
 borderRadius: "8px",
 textAlign: "center" as const,
 backgroundColor: "#f8f9fa",
};

const text = {
 margin: "0 0 16px 0",
 textAlign: "left" as const,
 fontSize: "16px",
 lineHeight: "24px",
 color: "#333333",
};

const button = {
 fontSize: "16px",
 backgroundColor: "#2563eb",
 color: "#fff",
 lineHeight: 1.5,
 borderRadius: "6px",
 padding: "12px 24px",
 textDecoration: "none",
 display: "inline-block",
 fontWeight: "600",
};

const footer = {
 color: "#6b7280",
 fontSize: "14px",
 textAlign: "center" as const,
 marginTop: "40px",
 borderTop: "1px solid #e5e7eb",
 paddingTop: "20px",
};
