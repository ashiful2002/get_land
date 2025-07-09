const Section = ({ title, children, className = "" }) => {
  return (
    <section className={`my-12 px-4 ${className}`}>
      {title && (
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          {title}
        </h2>
      )}
      <div>{children}</div>
    </section>
  );
};

export default Section;
