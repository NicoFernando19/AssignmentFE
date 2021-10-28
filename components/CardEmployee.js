import React from "react";
import Link from "next/link";

class CardEmployee extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img className="w-full" src={this.props.ImagePath} alt={this.props.ImageName} />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{this.props.Name}</div>
                    <p className="text-gray-700 text-base">
                    {this.props.Address}
                    </p>
                </div>
                <div className="flex items-center justify-end m-3">
                    <Link href={`/Detail/${this.props.id}`}>
                        <a className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Detail
                        </a>
                    </Link>
                </div>
            </div>
        )
    }
}

export default CardEmployee;