export const loadClientLib = () => {
  (() => {
    const id = "google-client-js";
    const src = "https://accounts.google.com/gsi/client";

    if (document.getElementById(id)) {
      return;
    }

    const script = document.createElement("script");
    script.id = id;
    script.type = "text/javascript";
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  })();
};
