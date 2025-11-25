import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | SnapFile",
  description: "Read about how SnapFile uses cookies and local storage.",
};

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
        <p className="text-muted-foreground">Last updated: November 24, 2025</p>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 leading-7 text-muted-foreground">
        
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">1. What are cookies?</h2>
          <p>
            Cookies are small text files that are used to store small pieces of information. They are stored on your device when the website is loaded on your browser. These cookies help us make the website function properly, make it more secure, provide better user experience, and understand how the website performs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">2. How we use cookies</h2>
          <p>
            As is common with most online services, our website uses first-party and third-party cookies for several purposes.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong className="text-foreground">Essential / Functional Cookies:</strong> We use local storage to remember your preferences, such as your <strong>Dark Mode / Light Mode</strong> setting. These are necessary for the UI to function as you expect.
            </li>
            <li>
              <strong className="text-foreground">Advertising Cookies:</strong> We display advertisements via <strong>Google AdSense</strong> to support our free tier. Google uses cookies to serve ads based on your prior visits to our website or other websites.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">3. Local Processing (No File Cookies)</h2>
          <p>
            It is important to note that <strong>we do not use cookies to store or track the files you upload</strong>. 
            On our Free Tier, file processing happens entirely within your browser&apos;s memory via WebAssembly. The files effectively never leave your device, and no session cookies are generated regarding the content of your files.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">4. Managing Cookies</h2>
          <p>
            You can change your browser settings to delete cookies that have already been set and to not accept new cookies. To learn more about how to do this, visit the help pages of your browser.
          </p>
          <p className="mt-4">
            Please note that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer (such as persistent Dark Mode), and some of our pages might not display properly.
          </p>
        </section>

      </div>
    </div>
  );
}