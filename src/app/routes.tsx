import { createBrowserRouter, redirect } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Blog } from "./pages/Blog";
import { Events } from "./pages/Events";
import { BookATalk } from "./pages/BookATalk";
import { Consultations } from "./pages/Consultations";
import { Sponsor } from "./pages/Sponsor";
import { BlogPostYearInReview } from "./pages/BlogPostYearInReview";
import { BlogPostFourWeeksToGo } from "./pages/BlogPostFourWeeksToGo";
import { BlogPostPackingList } from "./pages/BlogPostPackingList";
import { BlogPostWhichBackpacks } from "./pages/BlogPostWhichBackpacks";
import { BlogPostDebitCard } from "./pages/BlogPostDebitCard";
import { BlogPostHostelStays } from "./pages/BlogPostHostelStays";
import { BlogPostWelcome } from "./pages/BlogPostWelcome";
import { DynamicBlogPost } from "./pages/DynamicBlogPost";
import { Admin } from "./pages/Admin";
import { PhotoAssets } from "./pages/PhotoAssets";

export const router = createBrowserRouter([
  {
    path: "/admin",
    Component: Admin,
  },
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "blog", Component: Blog },
      { path: "blog/year-in-review-2023", Component: BlogPostYearInReview },
      { path: "blog/four-weeks-to-go", Component: BlogPostFourWeeksToGo },
      { path: "blog/packing-list", Component: BlogPostPackingList },
      { path: "blog/which-backpacks-to-buy", Component: BlogPostWhichBackpacks },
      { path: "blog/best-debit-card-abroad", Component: BlogPostDebitCard },
      { path: "blog/hostel-stays", Component: BlogPostHostelStays },
      { path: "blog/welcome", Component: BlogPostWelcome },
      { path: "blog/:slug", Component: DynamicBlogPost },
      { path: "events", Component: Events },
      { path: "book-a-talk", Component: BookATalk },
      { path: "consultations", Component: Consultations },
      { path: "sponsor", Component: Sponsor },
      { path: "photo-assets", Component: PhotoAssets },
      { path: "*", loader: () => redirect("/") },
    ],
  },
]);