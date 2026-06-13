export const CodeExample = {
  "Upload Notes": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>pixel-lab</title>
  </head>
  <body>
    <div id="root"></div>
    <div id="root"><span>HTML</span></div>
    <div id="root">Hyper text Markup Language</div>
    <div id="root"></div>
  <aside>
  <input type="range"/>
  </aside>
    <div id="root"></div>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

`,
  "generate summary": `
  @import "tailwindcss";


@layer utilities{
    .animate-in{
        animation-fill-mode: both;
    }

    .slide-in-from-top{
        animation-name: slideInFromTop;
    }

    .slide-in-from-bottom{
        animation-name: slideInFromBottom;
    }

     .duration-200{
        animation-duration: 200ms;
    }


    .duration-300{
        animation-duration: 300ms;
    }

    .duration-700{
        animation-duration: 700ms;
    }

    .delay-100{
      animation-delay:100ms ;
    }

     .delay-200{
      animation-delay:200ms ;
    }
    
    .delay-300{
      animation-delay:300ms ;
    }
}

@keyframes slideInFromTop {
    from{
        opacity: 0;
        transform: translateY(-1rem);
    }
    to{
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInFromBottom {
    from{
        opacity: 0;
        transform: translateY(1rem);
    }
    to{
        opacity: 1;
        transform: translateY(0);
    }
}



`,

  "generate flashcard": `
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";



// This line is also required — add it right after cors()
app.options("*", cors())

app.use(express.json());
app.use(cookieParser());

/* ---------------- ROUTES ---------------- */
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/reviews", reviewRouter);


`,
 "AI Chat": `
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";



// This line is also required — add it right after cors()
app.options("*", cors())

app.use(express.json());
app.use(cookieParser());

/* ---------------- ROUTES ---------------- */
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/reviews", reviewRouter);


`,
};

export const floatingCards = {
  "App.jsx": {
    bgColor: "bg-blue-500/20",
    iconColor: "text-blue-400",
    textColor: "text-blue-200",
    contentColor: "text-blue-300",
    icon: "HTML",
    title: "Hyper Text Markup Language",
    content: "Html is Used for the structure of a website",
  },

  "Hero.jsx": {
    bgColor: "bg-purple-500/20",
    iconColor: "text-purple-400",
    textColor: "text-purple-200",
    contentColor: "text-purple-300",
    icon: "CSS",
    title: "Cascading Style Sheets",
    content: "Css is Used for the styling of a website",
  },

  "Navbar.jsx": {
    bgColor: "bg-amber-500/20",
    iconColor: "text-amber-400",
    textColor: "text-amber-200",
    contentColor: "text-amber-300",
    icon: "JS",
    title: "JavaScript",
    content: "JavaScript can update and change both HTML and CSS",
  },
};
