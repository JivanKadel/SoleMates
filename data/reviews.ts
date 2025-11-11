export type Review = {
  id: string;
  review: string;
  user: string;
};

export const reviews: Review[] = [
  {
    id: "rev_001",
    review:
      "Great everyday sneaker — very comfortable, good arch support, and held up after a month of daily wear.",
    user: "Laxmi Pd. Dev",
  },
  {
    id: "rev_002",
    review:
      "Stylish and lightweight, but runs a half size small. I exchanged for a larger size and they're perfect now.",
    user: "Marquee Twain",
  },
  {
    id: "rev_003",
    review:
      "Excellent traction on wet surfaces. Cushioning is a bit firm for long runs, but ideal for walking and gym use.",
    user: "Abraham Link",
  },
  {
    id: "rev_004",
    review:
      "Materials feel premium and breathable. Slight rubbing on the heel during the first week, but the break-in was quick.",
    user: "Genghis Span",
  },
  {
    id: "rev_005",
    review:
      "Affordable and good value. Not as durable as high-end brands, but comfortable for casual wear.",
    user: "Diego Mara_Dialog",
  },
  {
    id: "rev_006",
    review:
      "Loved the color options and fit. Customer service handled a sizing issue quickly — would buy again.",
    user: "Donald Tailwind",
  },
];

export default reviews;
