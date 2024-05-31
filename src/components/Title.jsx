import { u } from '@/store/store';
import { useContextStore } from '@/store/cs';
import { useRecoilValue } from 'recoil';
import { m } from '@/m/t';
import { useSelector } from 'react-redux';

function Title ({ p, c }) {
  const z = useRecoilValue(m);
  const y = useSelector((state) => state.y);
  const items = u(state => state.items);
  const { x:o } = useContextStore();

  const text1 = `${o}$d${items[5]}m be9${y}ns i${z.z} w${items[5]}nd3r`;
  const text2 = `Th${y.y}s to0${items[8]} sh@l1 p${items[1]}s$`;

  return(
    <>
      {p === 786456 && <h5>{text1}:)</h5>}
      {c === 543845 && <h5>!{text2}</h5>}
    </>
  )
}

export default Title;