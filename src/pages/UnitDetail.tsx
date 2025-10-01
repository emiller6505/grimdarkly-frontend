import { useParams } from 'react-router-dom';

const UnitDetail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="unit-detail">
      <h1>Unit Detail</h1>
      <p>Unit ID: {id}</p>
      <p>This page will show detailed information about the selected unit.</p>
    </div>
  );
};

export default UnitDetail;
