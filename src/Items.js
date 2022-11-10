export const Items = ({ currentItems }) => {
  console.log({ currentItems });
  return (
    <div className="item">
      {currentItems?.map((items) => {
        return <img src={items.thumbnailUrl}></img>;
      })}
    </div>
  );
};
