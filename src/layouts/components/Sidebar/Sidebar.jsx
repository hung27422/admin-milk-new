import images from '../../../assets/Images/Image';
import MenuItem from '../../../components/MenuItem/MenuItem';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Sidebar() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('logo')}>
        <img src={images.logo} alt="" className={cx('img-logo')} />
      </div>
      <div className={cx('container')}>
        <div className={cx('menu')}>
          <MenuItem to={'/'} title={'Dashboard'} />
          <MenuItem to={'/AdminOrders'} title={'Order Management'} />
          <MenuItem to={'/AdminProducts'} title={'Product Management'} />
          <MenuItem to={'/AdminUsers'} title={'User Management'} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
