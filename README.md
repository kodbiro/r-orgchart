# R-orgchart

R-orgchart is simple library for displaying and creating orgcharts in React.


### Installation:

```sh
$ npm install -s r-orgchart
```

### Use:
```javascript
import Rorgchart from 'r-orgchart';
...
<Rorgchart />
```

### Props:
| Prop | Default | Description
| ------ | ------ | ------
| data |  array with root object: *[{id: 1, title: 'Root', ParentId: null}]* | Array of objects you wish to display. Each object must contain id, title and ParentId.
| readonly | false | By default, orgchart can be edited and nodes deleted. If you send this props, it will be readonly.
| disableRootEdit | false | Disable edit of root node.
| addNewChild | default function | There is default function for adding new node, but you can send your own if you wish - argument: parentId.
| deleteNode | default function | There is default function for deleting node, but you can send your own if you wish - argument: node.
| editNode | default function | There is default function for editing node, but you can send your own if you wish - argument: node (edited).
| animation | true | Turn on/off animation (visible when there is only a root node).
| nodeStyle | - | Custom style for node box.
| nodeClassName | - | CSS className for node box.
| btnsStyle | - | Custom style for buttons box.
| btnsClassName | - | CSS className for buttons box.
| lineColor | - | Custom color for lines connecting nodes.


### Exporting data:
To get back data array with all changes, you can call function exportData using a ref:

```javascript
    ...
    this.refs.rorgchart.exportData();
    ...
    <Rorgchart ref="rorgchart" />
    ...
```