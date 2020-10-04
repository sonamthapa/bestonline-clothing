import React, { Component } from 'react';
import MenuItem from '../menu-item/menu-item';
import './directory.styles.scss';

class Directory extends Component {
    state = {
        sections: [
            {
                title: 'hats',
                imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
                id: 1,
                linkUrl:''
            },
            {
                title: 'jackets',
                imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
                id: 2,
                linkUrl:''
            },
            {
                title: 'sneakers',
                imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
                id: 3,
                linkUrl:''
            },
            {
                title: 'womens',
                imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
                size: 'large',
                id: 4,
                linkUrl:''
            },
            {
                title: 'mens',
                imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
                size: 'large',
                id: 5,
                linkUrl:''
            } 
        ]
    }
    render() {
        return (
            <div className='directory-menu'>
                {
                    //alternative of (destructuring) is (spread operator)
                    // this.state.sections.map(({title, imageUrl, id, size}) => (
                    //     <MenuItem key={id} title={title} imageUrl={imageUrl} size={size}/>
                    this.state.sections.map(({id, ...otherSectionProps}) => (
                        <MenuItem key={id} {...otherSectionProps}/>
                    ))} 
            </div>
        );
    }
}
export default Directory;