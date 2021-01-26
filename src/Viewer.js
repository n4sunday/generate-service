import React, { useRef, useEffect } from 'react'
import './register-files'
import fileSaver from 'file-saver'

var PDFDocument = require('./utils/pad.service');
var blobStream = require('blob-stream');
var PdfTable = require('voilab-pdf-table');

const Viewer = ({ value, project, container }) => {

    const iframe = useRef();
    useEffect(() => {
        try {
            // eslint-disable-next-line no-new-func
            var fn = new Function(
                'PDFDocument',
                'blobStream',
                'project',
                'container',
                'iframe',
                'fileSaver',
                'PdfTable',
                'Voilab',
                value
            );
            fn(PDFDocument, blobStream, project, container, iframe.current, fileSaver, PdfTable);
        } catch (e) {
            console.log(e);
        }
    }, [value, iframe, project, container]);

    return <iframe title="preview" ref={iframe} width="600" height="775"></iframe>;
}

export default Viewer