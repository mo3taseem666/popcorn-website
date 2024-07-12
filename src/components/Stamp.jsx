export default function Stamp({ Children }) {
  return (
    <div className="bg-slate-800 cursor-default relative overflow-y-auto text-white w-[25%] h-full rounded-2xl p-3 ">
      {Children}
    </div>
  );
}
