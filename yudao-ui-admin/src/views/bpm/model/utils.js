export const templateXml = `
<?xml version="1.0" encoding="UTF-8"?>
<definitions 
  xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
  xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" 
  xmlns:camunda="http://camunda.org/schema/1.0/bpmn" 
  xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
  xmlns:activiti="http://activiti.org/bpmn" 
  id="m1577635100724" 
  name="" 
  targetNamespace="http://www.activiti.org/testm1577635100724"
>
  <process id="process" processType="None" isClosed="false" isExecutable="true">
    <extensionElements>
      <camunda:properties>
        <camunda:property name="a" value="1" />
      </camunda:properties>
    </extensionElements>
    <startEvent id="_2" name="start" />
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_leave">
    <bpmndi:BPMNPlane id="BPMNPlane_leave" bpmnElement="leave">
      <bpmndi:BPMNShape id="BPMNShape__2" bpmnElement="_2">
        <omgdc:Bounds x="144" y="368" width="32" height="32" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="149" y="400" width="23" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`
