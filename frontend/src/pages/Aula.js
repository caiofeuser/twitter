import Card from '../components/Card';

function Aula() {

  var nome1 = "Kretiska";
  var nome2 = "VTK";
  var nome3 = "Jean";
  var nome4 = "Gois";

  return(
    <>
      <Card nome={nome1}/>
      <Card nome={nome2}/>
      <Card nome={nome3}/>
      <Card nome={nome4}/>
      <Card/>
    </>
  );
}

export default Aula;