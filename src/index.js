require('./style.css');
import _ from 'lodash';

import React, { Component} from 'react';
import update from 'react-addons-update';
import PropTypes from 'prop-types';

import OrgChart from './components/Orgchart.js';

import fontawesome from '@fortawesome/fontawesome';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faFolder from '@fortawesome/fontawesome-free-solid/faFolder';
import faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt';
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt';

fontawesome.library.add(faCheck, faTimes, faPlus, faFolder, faPencilAlt, faTrashAlt)


class Rorgchart extends React.Component {
    static defaultProps = {
        readonly: false,
        disableRootEdit: false,
        data: [{id: 1, title: 'Root', ParentId: null}],
        addNewChild: undefined,
        deleteNode: undefined,
        editNode: undefined,
        animation: true,
        nodeStyle: null,
        nodeClassName: '',
        btnsStyle: null,
        btnsClassName: '',
        lineColor: ''
    }

    constructor(props) {
        super(props);

        const data = props.data;
        
        this.state = {
            data: data
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({data: nextProps.data});
        }
    }

    add = (parentId) => {
        const newId = _.maxBy(this.state.data, 'id').id + 1;

        const newNode = {
            id: newId,
            title: 'New node',
            ParentId: parentId,
        };
        this.setState({ data: [...this.state.data, newNode] });
    }

    delete = (node) => {
        const newData = this.deleteChildren(node, _.cloneDeep(this.state.data), node.id);
        _.remove(newData, {id: node.id});

        this.setState({ data: newData });
    }

    deleteChildren(n, data, stopNode) {
        const child = _.find(data, {ParentId: n.id});
        const parent = _.find(data, {id: n.ParentId});

        if(child) {
           return this.deleteChildren(child, data, stopNode);

        } else if(stopNode === n.id) {
            return data;

        } else {
            _.remove(data, {id: n.id});
           return this.deleteChildren(parent, data, stopNode);
        }
    }  

    edit = (node) => {
        const editIdx = _.findIndex(this.state.data, {id: node.id});
        let updated = update(this.state, {data: {[editIdx]: {$set: node}}} );
        this.setState(updated);
    }

    exportData = () => {
        return this.state.data;
    }

    render() {
        const {
            readonly,
            disableRootEdit,
            addNewChild,
            deleteNode,
            editNode,
            animation,
            nodeStyle,
            nodeClassName,
            btnsStyle,
            btnsClassName,
            lineColor
        } = this.props;

        const { data } = this.state;

        return (
            <OrgChart
                editable={!readonly}
                rootEditable={!disableRootEdit}
                data={data}
                addNewChild={addNewChild ? addNewChild : this.add}
                deleteNode={deleteNode ? deleteNode : this.delete}
                editNode={editNode ? editNode : this.edit}
                animation={animation}
                nodeStyle={nodeStyle}
                nodeClassName={nodeClassName}
                btnsStyle={btnsStyle}
                btnsClassName={btnsClassName}
                lineColor={lineColor}
            />
        );
    }
}
Rorgchart.propTypes = {
    readonly: PropTypes.bool,
    disableRootEdit: PropTypes.bool,
    data: PropTypes.array,
    addNewChild: PropTypes.func,
    deleteNode: PropTypes.func,
    editNode: PropTypes.func,
    animation: PropTypes.bool,
    nodeStyle: PropTypes.object,
    nodeClassName: PropTypes.string,
    btnsStyle: PropTypes.object,
    btnsClassName: PropTypes.string,
    lineColor: PropTypes.string
}
export default Rorgchart;

