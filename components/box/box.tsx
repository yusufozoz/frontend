
function MyButton(props: any) {
  return (
    <button>{props.children}</button>
  );
}

export default function MyApp() {
  return (
    <div>
      
      <MyButton>Buton</MyButton>
    </div>
  );
}