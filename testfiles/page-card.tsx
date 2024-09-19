export default function Home() {
  return (
    <main className="bg-gray-300 h-screen flex items-center justify-center p-5 dark:bg-gray-700 ">
      <div className="max-w-screen-sm w-full bg-white p-5 rounded-2xl shadow-lg dark:bg-gray-500">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-gray-600 font-semibold -mb-1 dark:text-gray-200">
              In transit
            </span>
            <span className="text-4xl font-semibold dark:text-white">
              Coolblue
            </span>
          </div>
          <div className="size-12 bg-orange-400 rounded-full"></div>
        </div>
        <div className="my-2 flex items-center gap-2">
          <span
            className="px-2.5 py-1.5 bg-green-400 text-white text-xs font-medium rounded-full uppercase 
            transition hover:bg-pink-400 hover:scale-125"
          >
            Today
          </span>
          <span className="dark:text-gray-100">10:00 - 12:00</span>
        </div>
        <div className="relative">
          <div className="bg-gray-200 w-full h-2 rounded-full absolute" />
          <div className="bg-green-400 w-1/2 h-2 rounded-full absolute" />
        </div>
        <div className="flex justify-between items-center mt-5 dark:text-gray-300">
          <span>Expected</span>
          <span>Sorting center</span>
          <span className="text-gray-400">In trasit</span>
          <span className="text-gray-400">Delivered</span>
        </div>
      </div>
    </main>
  );
}
