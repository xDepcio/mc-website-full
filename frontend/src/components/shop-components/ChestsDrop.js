import { useState } from 'react'
import './KitPreview.css'

const vipKitData = [
    {
        backgroundImageUrl: 'https://mc-server-website-nextjs13.vercel.app/images/Iron_Helmet.png',
        name: 'Zelazny helm',
        enchants: ['Protection IV', 'Unbreaking III'],
        amount: 2
    },
    {
        backgroundImageUrl: 'https://mc-server-website-nextjs13.vercel.app/images/Iron_Chestplate.png',
        name: 'Zelazny Napiersnik',
        enchants: ['Protection IV', 'Unbreaking III'],
        amount: 2
    },
    {
        backgroundImageUrl: 'https://mc-server-website-nextjs13.vercel.app/images/Iron_Leggings.png',
        name: 'Zelazne spodnie',
        enchants: ['Protection IV', 'Unbreaking III'],
        amount: 2
    },
    {
        backgroundImageUrl: 'https://mc-server-website-nextjs13.vercel.app/images/Iron_Boots.png',
        name: 'Zelazny Buty',
        enchants: ['Protection IV', 'Unbreaking III'],
        amount: 2
    },
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },

]


function ChestsDrop() {

    const [displayItemInfo, setDisplayitemInfo] = useState(false)
    const [displayItemId, setDisplayItemId] = useState(1)

    return (
        <div className='svip-kit-view'>
            <p>Z magicznych skrzenek wypaść mogą:</p>
            <div className='kit-svip-grid'>
                <h2 className='in-inventory-svip'>/kit svip</h2>
                {vipKitData.map((ele, i) => {
                    return (
                        <div style={{ position: 'relative' }} key={i}>
                            <div
                                style={
                                    {
                                        backgroundImage:
                                            ele.backgroundImageUrl ? `url(${ele.backgroundImageUrl})` : ''
                                    }
                                }
                                onMouseEnter={() => {
                                    setDisplayitemInfo(true)
                                    setDisplayItemId(i)
                                }}
                                onMouseLeave={() => {
                                    setDisplayitemInfo(false)
                                }}
                                className={`kit-item`}>
                                <div className='items-amount'>{ele.amount}</div>
                            </div>
                            {(displayItemInfo && displayItemId === i && ele.name) && (
                                <div className='item-hover'>
                                    <div className='item-hover-inner-div'>
                                        <p style={{ padding: ele.name.length >= 18 ? '0px 100px' : '' }} className='item-width-setter-hover'></p>
                                        <p className='item-hover-name'>{ele.name}</p>
                                        {ele.enchants.map((enchant, j) => {
                                            return (
                                                <p key={j} className='item-hover-stats'>{enchant}</p>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ChestsDrop
