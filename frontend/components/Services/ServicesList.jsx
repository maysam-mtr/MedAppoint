import React from 'react'
import {services} from '../../assets/data/services';
import ServiceCard from './ServiceCard';

export default function ServiceList(props) {
  const {isHomePage} = props;

  const displayedServices = isHomePage ? services.slice(0, 3) : services;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
        {displayedServices.map((item, index) => <ServiceCard item={item} index={index} key={index}/>)}
    </div>
  )
}
