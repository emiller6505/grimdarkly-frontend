import { useParams } from 'react-router-dom';

const WeaponDetail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="weapon-detail">
      <h1>Weapon Detail</h1>
      <p>Weapon ID: {id}</p>
      <p>This page will show detailed information about the selected weapon.</p>
    </div>
  );
};

export default WeaponDetail;
