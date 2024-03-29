// @flow
import React from 'react'
import PropTypes from 'prop-types';
import {Card, Image, Placeholder} from 'semantic-ui-react'
import Button from '../Button'
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import Slider from "react-slick";
import {ArrowContainer, AddressRow, PriceText, InformationRow} from "./style";
import {formatToCurrency} from "../../utils";

const PropertyCard = (props) => {
    const settings = {
        dots: false,
        infinite: true,
        adaptiveHeight: true,
        speed: 500,
        slidesToShow: 1,
        nextArrow: <ArrowContainer right> X</ArrowContainer>,
        prevArrow: <ArrowContainer>V</ArrowContainer>,
        arrows: props.arrows,
        slidesToScroll: 1,
        height: 219
    };

    const mountCarousel = (): Array<Image> => {
        return (
            props.item.photos.map(photo => {
                return (<Image key={photo} src={photo} fluid/>)
            })
        )
    };

    const getImages = () => {
        return props.isCarousel ? mountCarousel() : <Image src={props.item.photos[0]} fluid/>
    };

    const onClick = () => {
        return props.onClick(props.item.id)
    }

    const loadingState = (
        <Placeholder>
            <Placeholder.Header><Placeholder.Line length="long"/></Placeholder.Header>
            <div>
                <Placeholder.Line length="short"/>
            </div>
            <AddressRow>
                <Placeholder.Line length="medium"/>
                <Placeholder.Line length="long"/>
            </AddressRow>
            <Placeholder.Paragraph>
                <Placeholder.Line lenght="short"/>
            </Placeholder.Paragraph>
        </Placeholder>
    )

    return (
        <div style={{padding: 7, margin: 5}}>
            <Card style={{width: 330, minHeight: 450}}>
                {props.loading ?
                    (
                        <Placeholder style={{width: 330, height: 220}}>
                            <Placeholder.Image square/>
                        </Placeholder>
                    ) :
                    <Slider {...settings}>{getImages()}</Slider>
                }
                <Card.Content>
                    {props.loading ? loadingState :
                        <React.Fragment>
                            <Card.Header style={{fontSize: '1.12em'}}>{props.item.title}</Card.Header>
                            <Card.Meta>
                                <span>{props.item.property.type}</span>
                            </Card.Meta>
                            <AddressRow>
                                <span>{props.item.property.address.street}</span>
                                <div>{props.item.property.address.neighborhood} - {props.item.property.address.city}</div>
                            </AddressRow>
                            <InformationRow>
                                <div>
                                    <Icon size='small' name="th"/>
                                    {props.item.property.area} m2
                                </div>
                                <div>
                                    <Icon size='small' name="bed"/>
                                    {props.item.property.bedrooms} dormitórios
                                </div>
                            </InformationRow>
                            <PriceText>
                                {formatToCurrency(props.item.salePrice || 0)}
                            </PriceText>
                        </React.Fragment>}
                </Card.Content>
                <Card.Content extra>
                    <Button data-testid="request-proposal" fluid positive onClick={onClick}>Solicitar Parceria</Button>
                </Card.Content>
            </Card>
        </div>
    )
};

PropertyCard.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
    arrows: PropTypes.bool,
    isCarousel: PropTypes.bool
};

export default PropertyCard
