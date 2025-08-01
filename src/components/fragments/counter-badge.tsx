type CounterBadgeType = {
  value: number;
};

export default function CounterBadge({ value }: CounterBadgeType) {
  return (
    <div className="bg-[#F2F4F7] w-7 h-5 grid place-content-center rounded-full">
      <span className="text-xs text-clr_gray_400 font-medium">{value}</span>
    </div>
  );
}
