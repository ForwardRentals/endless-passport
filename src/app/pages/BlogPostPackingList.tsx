import { Link } from "react-router";
import { Calendar, Tag, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { DARK, GOLD, goldGradient } from "../siteTheme";
import { NewsletterSignup } from "../components/NewsletterSignup";

import imgHero        from "figma:asset/4be0af614b01a2a3131569b7609f5e87accb8a2c.png";  // Brian from behind hiking green mountains
import imgBackpack    from "figma:asset/4719646452f60f40c2fd18a839433b9f0d03a5ea.png";  // packed backpack contents laid out
import imgBoots       from "figma:asset/f189658d20e6cc202e17a3edbc085eaa24c0ffd8.png";  // On Cloud Cloudrock boots
import imgDeodorant   from "figma:asset/7f91baf26eef7d7a05b971b6264959a4fcdd9cd0.png";  // broken Thai Crystal Deodorant Salt Stone
import imgWaterBottle from "figma:asset/4f61f606421f17d0e0f9e07a75889a95a671f485.png";  // Iron Flask at campsite
import imgBooks       from "figma:asset/2d904bc08808ef9be3c5f5eeef27cfcce05472e2.png";  // hostel book-swap shelf
import imgPillow      from "figma:asset/4c5feed48d9d2271a4c1ff34588d38518a4a67e7.png";  // Brian on plane with Travelrest pillow, thumbs up
import imgCards       from "figma:asset/136048dcb8ac765b88c793edeec181976b848b7b.png";  // travelers playing cards at hostel

const tags = ["packing list", "backpacking tips", "budget travel"];

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: GOLD, textDecoration: "underline", textUnderlineOffset: "3px" }}
    >
      {children}
    </a>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mt-12 mb-4"
      style={{
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        color: DARK,
        fontSize: "1.45rem",
        lineHeight: 1.25,
        borderBottom: `2px solid ${GOLD}`,
        paddingBottom: "0.4rem",
        display: "inline-block",
      }}
    >
      {children}
    </h2>
  );
}

export function BlogPostPackingList() {
  return (
    <div style={{ background: "#FAFAF8" }}>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden" style={{ background: DARK }}>
        <img
          src={imgHero}
          alt="Brian hiking with a backpack through lush green mountains"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          style={{ objectPosition: "center 40%" }}
        />
        <div className="relative pt-32 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex flex-wrap gap-2 justify-center mb-5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs capitalize"
                  style={{ background: "rgba(232,168,56,0.2)", color: GOLD, border: "1px solid rgba(232,168,56,0.4)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1
              className="text-white mb-5"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Packing List for a Backpacking Journey Abroad
            </h1>
            <div className="flex items-center justify-center gap-5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} /> September 2, 2022
              </span>
              <span>·</span>
              <span>By <span style={{ color: GOLD }}>Brian</span></span>
              <span>·</span>
              <span>10 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ARTICLE BODY ─── */}
      <article className="py-14 px-4">
        <div className="max-w-2xl mx-auto">

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm mb-10 transition-colors"
            style={{ color: "#999" }}
            onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={e => (e.currentTarget.style.color = "#999")}
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          {/* Hero photo */}
          <figure className="mb-10">
            <img
              src={imgHero}
              alt="Brian hiking solo with a backpack through verdant mountain terrain"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "520px", objectFit: "cover", objectPosition: "center 40%" }}
            />
          </figure>

          {/* Intro */}
          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              Did you pack multiple massive suitcases for your most recent weekend getaway? You're not alone.
              Now, imagine preparing for a multi-month journey and fitting all of your possessions into just
              two backpacks. Does this seemingly impossible thought riddle you with anxiety? Fear not as we
              tackle how this task is quite manageable (and even fun)!
            </p>
            <p>
              First, the purpose of your planned journey matters and will help dictate your packing list.
              Three days of hardcore camping along the Kalalau Trail on Kauai will necessitate survival gear
              while an around-the-world trip will involve a greater ratio of practical day-to-day items. We
              will focus on preparing for this latter type of experience.
            </p>
            <p>
              Regarding the best overhead compartment and carry-on backpacks to purchase, check out my
              detailed{" "}
              <Link
                to="/blog/which-backpacks-to-buy"
                style={{ color: GOLD, textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                article
              </Link>{" "}
              on that subject. Here, though, we will talk about what to pack <em>inside</em> your backpacks.
            </p>
          </div>

          {/* ── CLOTHING ── */}
          <SectionHeading>Clothing</SectionHeading>

          <figure className="mb-8">
            <img
              src={imgBackpack}
              alt="Brian's two backpacks laid open showing neatly packed clothing and gear"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "440px", objectFit: "cover" }}
            />
            <figcaption className="text-center mt-3 text-xs italic" style={{ color: "#aaa" }}>
              Everything fits — the art of packing light
            </figcaption>
          </figure>

          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              <strong>Less is more!</strong> This is a great mindset to live by. I got by with 4–5 shirts,
              a thin sweater, a jacket, 2–3 pairs of shorts, 1–2 pairs of pants, a hat, 4–5 pairs of socks,
              and 4–5 pairs of underwear. That's it!
            </p>
            <p>
              Be comforted that washers (and sometimes dryers) are available for self-service in virtually
              every hostel for a small charge. You can also elect for laundry service where and when that
              option is affordable. On average, I did laundry once every 10–14 days. And, yes, there were
              many instances of undies having to be turned inside out!
            </p>
            <p>
              Cotton is the enemy because it takes up valuable real estate, adds extra weight to your pack,
              and takes much longer to dry. Vie for garments made of quick-drying material. I highly
              recommend shopping at{" "}
              <A href="https://www.patagonia.com/home/">Patagonia</A> for comfortable, durable, and
              moisture-wicking clothing. Their ironclad guarantee and return policy are quite generous as
              well.
            </p>
          </div>

          {/* ── FOOTWEAR ── */}
          <SectionHeading>Footwear</SectionHeading>

          <figure className="mb-8">
            <img
              src={imgBoots}
              alt="Brian breaking in his new On Cloud Cloudrock Waterproof hiking boots"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "420px", objectFit: "cover" }}
            />
            <figcaption className="text-center mt-3 text-xs italic" style={{ color: "#aaa" }}>
              Breaking in the new On Cloud Cloudrock Waterproof boots
            </figcaption>
          </figure>

          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              You only need three pairs of footwear. For hiking and climbing, I swear by my{" "}
              <A href="https://www.on-running.com/en-us/shoe-finder/cloudrock-waterproof">On Cloud Cloudrock Waterproof</A>{" "}
              boots. They are breathable, comfortable, and supportive. I also wear these on travel days as
              they can be bulky to pack and add weight to an already heavy backpack.
            </p>
            <p>
              Canvas sneakers (think{" "}
              <A href="https://www.skechers.com/">Skechers</A>) are a nice option to "dress up" so that you
              can go out on the town without feeling like an out-of-place climber or beach bum. They pack
              easily and lightly.
            </p>
            <p>
              Speaking of the beach, get a pair of{" "}
              <A href="https://amzn.to/3B6wIIL">Chaco Zcloud Sport Sandals</A>. They fit like a glove, are
              deceivingly comfortable, and never slip.
            </p>
          </div>

          {/* ── TOILETRIES ── */}
          <SectionHeading>Toiletries and Medicine</SectionHeading>

          <div className="space-y-5 leading-relaxed mb-8" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              In general, packing travel-sized items is a good rule of thumb. Target has a glorious aisle
              devoted to this. We are talking mini shaving creams, tiny sunscreens, plastic soap bar
              containers, toothbrush holders, and much more.
            </p>
            <p>
              Priority #1 is your health and safety. Make sure you have an ample supply of necessary
              medicines, pharmaceuticals, and a handy first aid kit. The kit that I recommend from{" "}
              <A href="https://amzn.to/3Q7L0xg">First Aid Only</A> weighs only a pound and contains
              virtually everything that you'd need (298 pieces) in a true first aid emergency.
            </p>
            <p>
              A quick-dry travel towel is also critical. Not only does it take up much less space than a
              cotton towel, but it is quite soft and — big shocker — dries quickly!{" "}
              <A href="https://amzn.to/3R8bDn2">Wise Owl Outfitters</A> has great size and color options.
              It is worth mentioning that I also pack an additional{" "}
              <A href="https://amzn.to/3KFXwTt">microfiber towel</A> (or serape) for use at the beach.
              Having two separate towels will keep you clean, hygienic, happy, and equipped for a wide
              variety of water-based activities!
            </p>
            <p>
              For an aluminum-free deodorant, I always pack at least one{" "}
              <A href="https://amzn.to/3cEUTVe">Thai Crystal Deodorant Salt Stone</A> as recommended by
              fellow travel enthusiast and friend,{" "}
              <A href="https://www.rachelelizabethdennis.com/">Rachel Dennis</A>. Simply dab a small amount
              of warm water onto the salt slab, apply it to your body, dry the slab after use, and screw
              the cap back on. Try not to drop it though!
            </p>
          </div>

          <figure className="mb-8">
            <img
              src={imgDeodorant}
              alt="A Thai Crystal Deodorant Salt Stone shattered into pieces on a wooden surface"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
            <figcaption className="text-center mt-3 text-xs italic" style={{ color: "#aaa" }}>
              Dropping the Thai Crystal Deodorant Salt Stone just once can have devastating consequences!
            </figcaption>
          </figure>

          {/* ── WATER BOTTLE ── */}
          <SectionHeading>Water Bottle</SectionHeading>

          <figure className="mb-8">
            <img
              src={imgWaterBottle}
              alt="Brian's Twilight Blue Iron Flask water bottle resting on rocks at a campsite"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "420px", objectFit: "cover" }}
            />
            <figcaption className="text-center mt-3 text-xs italic" style={{ color: "#aaa" }}>
              While camping, the Twilight Blue 22-ounce Iron ºFlask came in handy
            </figcaption>
          </figure>

          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              I live and die by my{" "}
              <A href="https://amzn.to/3Typc0C">Twilight Blue 22-ounce Iron ºFlask</A>. This gorgeous
              stainless steel water bottle is leakproof and keeps liquids at the temperature you want them
              to remain. A cinch to clean, it comes with three different easy-to-attach lids for your
              various drinking needs.
            </p>
            <p>
              Larger sizes of the Iron Flask (up to 64 ounces) are available, but I found that the
              22-ounce option strikes the perfect balance of holding a good amount of water while packing
              easily. The next size up, a{" "}
              <A href="https://amzn.to/3KHT46Q">32-ouncer</A>, also does the trick, but I found it to be
              a bit too big and clunky for me.
            </p>
          </div>

          {/* ── TECHNOLOGY ── */}
          <SectionHeading>Technology</SectionHeading>

          <div className="space-y-5 leading-relaxed mb-8" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              The pictures that I take while traveling are among my most valuable souvenirs. Having the
              most recent{" "}
              <A href="https://amzn.to/3KCPqen">iPhone</A> for this task has never failed me. I like the
              convenience of not having to lug around a big expensive camera. Once connected to WiFi, I
              always back up my day's photos on Google Photos. When my phone was stolen, my utilization of
              Google Photos was literally the reason that my entire trip's worth of pictures was not lost
              forever.
            </p>
            <p>
              Gotta love listening to music and podcasts while traveling! Downloading Spotify is the way
              to go. Invest in a pair of{" "}
              <A href="https://amzn.to/3TB0X1W">Apple AirPods Pro</A> to eliminate the annoying hassle of
              getting tangled up in headphone cords. They charge quickly and the charge lasts a long time.
            </p>
            <p>
              You likely know that every country does not have the same wall outlets. If you plan on
              continent-hopping, AmazonBasics has you covered with an affordable{" "}
              <A href="https://amzn.to/3KCiToN">world travel plug adapter set</A>. It contains six
              different adapter plugs for use in most countries.
            </p>
            <p>
              Anker makes the best{" "}
              <A href="https://amzn.to/3wNFdWu">portable chargers</A> and can be a lifesaver when your
              phone dies. This lightweight charger is long-lasting, durable, and provides at least two
              full charges for your iPhone. The charger itself takes only about five hours to fully
              recharge.
            </p>
            <p>
              At least once a week, as I travel, I make a point to journal my feelings, reflections, and
              plans. I have now purchased three iterations of this{" "}
              <A href="https://amzn.to/3RvqqaW">Old World travel journal</A>. At just over eight inches
              tall, it is perfectly sized. It includes inspirational travel quotes on many of the pages
              and folds over protecting the pages from damage and general wear and tear.
            </p>
            <p>
              Having a{" "}
              <A href="https://amzn.to/3B6oP6h">Kindle</A> or{" "}
              <A href="https://amzn.to/3ei46TR">iPad Mini</A> certainly helps save space and weight as
              you read along the way. However, if you prefer the nostalgic experience of turning physical
              pages, be comforted that most hostels have a library where you can take and leave a book.
            </p>
          </div>

          <figure className="mb-8">
            <img
              src={imgBooks}
              alt="A cozy hostel book-swap shelf full of travel paperbacks"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "420px", objectFit: "cover" }}
            />
            <figcaption className="text-center mt-3 text-xs italic" style={{ color: "#aaa" }}>
              Take a book, leave a book as you hop hostels!
            </figcaption>
          </figure>

          {/* ── FITNESS ── */}
          <SectionHeading>Fitness Gear</SectionHeading>

          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              You will likely have to get creative if you want to stay physically fit along your journey.
              Authentic exercise is a key mindset. You don't need equipment to hike, run, or walk!
              Generally, I will walk to a destination if it is 20 minutes or closer by foot. Additionally,
              at your accommodation, you can do bodyweight workouts to help build strength and endurance
              including planks, push-ups, sit-ups, squats, and lunges.
            </p>
            <p>
              Beyond that, if you want to bring along workout equipment, think light! On my next trip, I
              will be packing the{" "}
              <A href="https://amzn.to/3RbwUfl">DEGOL skipping rope</A> with ball bearings. Another
              valuable asset is VEICK's{" "}
              <A href="https://amzn.to/3cCsrmY">set of resistance bands</A> with five levels of bands
              (10–50 pounds), handles, straps, and a door anchor. My advice would be to leave a few of
              the bands at home and take one or two with you in the included travel carry bag.
            </p>
          </div>

          {/* ── IMPORTANT ADD-ONS ── */}
          <SectionHeading>Important Add-Ons</SectionHeading>

          <figure className="mb-8">
            <img
              src={imgPillow}
              alt="Brian smiling on a plane wearing his blue Travelrest Nest travel pillow and giving a thumbs up"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "440px", objectFit: "cover" }}
            />
            <figcaption className="text-center mt-3 text-xs italic" style={{ color: "#aaa" }}>
              Ready for takeoff with the Travelrest Nest
            </figcaption>
          </figure>

          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              For journeys of any length, it is critical to invest in a comfortable travel pillow. I adore
              my{" "}
              <A href="https://amzn.to/3Qaib3h">Travelrest Nest</A> which is incredibly luxurious and
              packs down to a quarter of its size.
            </p>
            <p>
              Most hostels provide a locker, but you are responsible for supplying your own lock. If you
              want to keep a key on you, purchase a{" "}
              <A href="https://amzn.to/3Ty48qZ">Master Lock</A>. However, if you prefer committing a
              short code to memory, go with the{" "}
              <A href="https://amzn.to/3efYI3V">BRINKS 4-Dial Resettable Padlock</A>.
            </p>
            <p>
              Make copies of your travel documents and other key information. It is wise to scan or take
              pictures to print out and keep with you, email an additional copy of everything to yourself,
              and share this intel with trusted loved ones. This may include your passport, primary credit
              card(s), flight reservations, and planned accommodation bookings.
            </p>
            <p>
              A universal way to break the ice with new hostelers is to bust out a{" "}
              <A href="https://amzn.to/3Q3tQkc">deck of playing cards</A>! I have found that they really
              come in handy.
            </p>
            <p>
              Lastly, with special friends that you make along the way, it is always a thoughtful surprise
              to give them a handwritten{" "}
              <A href="https://amzn.to/3KCfBSt">travel-themed thank you note</A> as you go your separate
              ways.
            </p>
          </div>

          {/* Pull quote */}
          <blockquote
            className="my-10 py-6 px-8 rounded-xl"
            style={{ background: DARK, borderLeft: `4px solid ${GOLD}` }}
          >
            <p
              className="text-white"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontStyle: "italic", lineHeight: 1.6 }}
            >
              "In a worst-case scenario, there is always a kind fellow traveler out there to lend you a helping hand!"
            </p>
          </blockquote>

          {/* Cards photo */}
          <figure className="mb-8">
            <img
              src={imgCards}
              alt="Travelers gathered around a hostel table playing cards together"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "440px", objectFit: "cover" }}
            />
            <figcaption className="text-center mt-3 text-xs italic" style={{ color: "#aaa" }}>
              Playing cards brings travelers together
            </figcaption>
          </figure>

          {/* ── TAKEAWAYS ── */}
          <SectionHeading>Takeaways</SectionHeading>

          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              You can do this! Packing for a long-term journey can be stressful, but with concrete
              planning and knowing you can fill in the gaps along the way, you are sure to hit the road
              ready to go. Although not fully comprehensive, utilize the above framework and modify it
              according to your needs.
            </p>
            <p>
              As my own multi-country adventures unfolded, I was comforted in knowing that I could buy
              most items in each place. Oftentimes, I would pick up odds and ends at a store near my
              hostel or even at the airport. Some of the most remote places that I visited sold necessities
              for purchase. In a worst-case scenario, there is always a kind fellow traveler out there to
              lend you a helping hand!
            </p>
          </div>

          {/* Tags + Share */}
          <div
            className="mt-12 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
            style={{ borderTop: "1px solid rgba(0,0,0,0.09)" }}
          >
            <div className="flex flex-wrap gap-2 items-center">
              <Tag size={14} style={{ color: "#bbb" }} />
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs capitalize"
                  style={{ background: "#f0f0f0", color: "#666" }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              className="flex items-center gap-2 text-sm transition-colors"
              style={{ color: "#999" }}
              onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={e => (e.currentTarget.style.color = "#999")}
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
            >
              <Share2 size={14} /> Share
            </button>
          </div>

          {/* Author bio */}
          <div
            className="mt-8 p-6 rounded-xl flex items-start gap-5"
            style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}
          >
            <img
              src={imgPillow}
              alt="Brian Michalski"
              className="w-16 h-16 rounded-full object-cover shrink-0"
              style={{ objectPosition: "center 10%" }}
            />
            <div>
              <p
                className="mb-1"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: DARK, fontSize: "1rem" }}
              >
                Brian Michalski
              </p>
              <p style={{ color: "#666", fontSize: "0.88rem", lineHeight: 1.6 }}>
                Brian is a Chicago-based educator and world traveler who spent five years solo backpacking
                through 60+ countries. He now shares those stories through live presentations across Chicagoland.
              </p>
            </div>
          </div>

          {/* Next post nav */}
          <div
            className="mt-10 pt-8 flex justify-end"
            style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
          >
            <Link
              to="/blog/four-weeks-to-go"
              className="flex items-center gap-2 text-sm transition-colors"
              style={{ color: "#888" }}
              onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={e => (e.currentTarget.style.color = "#888")}
            >
              <span className="text-right">
                <span className="block text-xs uppercase tracking-wider mb-0.5" style={{ color: "#bbb" }}>Next Post</span>
                Four Weeks To Go
              </span>
              <ArrowRight size={16} className="shrink-0" />
            </Link>
          </div>
        </div>
      </article>

      {/* ─── NEWSLETTER ─── */}
      <section className="py-14 px-4 text-center" style={{ background: DARK }}>
        <h2
          className="text-white mb-3"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700 }}
        >
          Follow the Adventure
        </h2>
        <p className="mb-7" style={{ color: "rgba(255,255,255,0.6)", maxWidth: "380px", margin: "0 auto 1.75rem" }}>
          Get new posts delivered straight to your inbox.
        </p>
        <NewsletterSignup />
        <p className="mt-5 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          Or follow along on Instagram:{" "}
          <a
            href="https://www.instagram.com/seebriantravel"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: GOLD }}
          >
            @seebriantravel
          </a>
        </p>
      </section>
    </div>
  );
}