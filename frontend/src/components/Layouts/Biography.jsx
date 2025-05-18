const Biography = () => {
  return (
    <section className="container mx-auto mt-[200px] flex flex-col items-center justify-between border-b pb-[100px] md:flex-row">
      <div className="w-1/2">
        <img
          src="https://websitedemos.net/book-store-02/wp-content/uploads/sites/834/2021/04/author-book-store-author-img.jpg"
          alt="image"
          className="h-[553px] w-[553px] object-contain"
        />
      </div>
      <div className="w-1/2 md:ml-40">
        <p className="text-main mb-8 text-xs font-bold uppercase tracking-widest">Biography</p>
        <h2 className="mb-4 text-[40px] font-medium md:text-[48px]">John Roberts</h2>
        <p className="mb-4 w-[374px] text-gray-700">
          Tellus tellus mattis pulvinar nulla euismod fermentum rhoncus sed vestibulum neque praesent pharetra ut fames
          viverra suscipit gravida dictumst volutpat ullamcorper lacus, malesuada enim proin volutpat mattis nunc amet,
          eget vitae egestas.
        </p>
        <p className="w-[374px] text-gray-700">
          Vulputate vulputate eget cursus nam ultricies mauris, malesuada elementum lacus arcu, sit dolor ipsum, ac
          felis, egestas vel tortor eget aenean nam.
        </p>
        <button className="border-main text-main hover:bg-main mt-10 rounded-md border px-[21px] py-[13px] transition-all duration-300 hover:text-white">
          Read more
        </button>
      </div>
    </section>
  );
};
export default Biography;
