import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";

export function FloatingChatButton() {
  return (
    <button
      type="button"
      aria-label="Open chat"
      className="group fixed bottom-5 right-5 z-[90] grid size-14 place-items-center rounded-full bg-(--voyana-color-button-primary) text-(--voyana-color-button-primary-text) shadow-[0_16px_32px_rgb(var(--voyana-rgb-background-dark)/0.24),0_6px_14px_rgb(var(--voyana-rgb-button-primary)/0.36)] transition duration-200 hover:-translate-y-1 hover:bg-(--voyana-color-button-primary-hover) hover:shadow-[0_20px_42px_rgb(var(--voyana-rgb-background-dark)/0.28),0_10px_24px_rgb(var(--voyana-rgb-button-primary)/0.42)] focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-button-primary)/0.34)] active:translate-y-0 active:bg-(--voyana-color-button-primary-active) sm:bottom-6 sm:right-6 sm:size-15"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-(--voyana-color-button-primary) opacity-20 transition group-hover:scale-125 group-hover:opacity-0"
      />
      <span
        aria-hidden="true"
        className="absolute inset-1 rounded-full border border-[rgb(var(--voyana-rgb-white)/0.52)]"
      />
      <ChatBubbleRoundedIcon className="relative text-[1.35rem] sm:text-[1.45rem]" />
    </button>
  );
}
