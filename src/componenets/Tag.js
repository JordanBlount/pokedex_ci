import '../css/Tag.css'

const Tag = (props) => {
    return (
        // An example: grass-tag, poison-tag, electric-tag
        <div className={`tag ${props.type}-tag`}>
            {/* This right here capitalizes the types since they are passed in lowercase */}
            <p className="tag-text">{props.type.charAt(0).toUpperCase() + props.type.slice(1)}</p>
        </div>
    );
};

export default Tag;