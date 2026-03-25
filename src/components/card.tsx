import { CardType } from '@/lib/types'
import { CardRow } from '@/components/card-row'

export const Card = ({ card }: { card: CardType }) => {
  return (
    <div className="bg-white p-5 rounded-xl space-y-2 shadow-xl">
      <CardRow color="bg-person" allPlay={card.allplay === 'person'} keyText="P">
        {card.person}
      </CardRow>
      <CardRow color="bg-world" allPlay={card.allplay === 'world'} keyText="W">
        {card.world}
      </CardRow>
      <CardRow color="bg-object" allPlay={card.allplay === 'object'} keyText="O">
        {card.object}
      </CardRow>
      <CardRow color="bg-action" allPlay={card.allplay === 'action'} keyText="A">
        {card.action}
      </CardRow>
      <CardRow color="bg-nature" allPlay={card.allplay === 'nature'} keyText="N">
        {card.nature}
      </CardRow>
      <CardRow color="bg-random" allPlay={card.allplay === 'random'} keyText="R">
        {card.random}
      </CardRow>
    </div>
  )
}
